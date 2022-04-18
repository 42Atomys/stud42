package jwtks

import (
	context "context"
	"fmt"
	"net"
	"time"

	"github.com/google/uuid"
	"github.com/lestrrat-go/jwx/v2/jwt"
	"github.com/rs/zerolog/log"
	"github.com/spf13/viper"
	"google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	"google.golang.org/grpc/credentials"
	status "google.golang.org/grpc/status"
)

type server struct {
	UnimplementedJWTKSServiceServer

	tokenValidity time.Duration
}

func ServeGRPC(port *string) error {

	lis, err := net.Listen("tcp", fmt.Sprintf(":%s", *port))
	if err != nil {
		log.Fatal().Msgf("failed to listen: %v", err)
	}

	creds, err := credentials.NewServerTLSFromFile(
		viper.GetString("jwtks.grpc.cert_public_key"),
		viper.GetString("jwtks.grpc.cert_private_key"),
	)
	if err != nil {
		log.Fatal().Msgf("failed to load credentials: %v", err)
	}

	s := grpc.NewServer(grpc.Creds(creds))
	RegisterJWTKSServiceServer(s, &server{
		tokenValidity: 30 * 24 * time.Hour,
	})
	log.Info().Msgf("server grpc listening at %v", lis.Addr())
	return s.Serve(lis)
}

func (s *server) GenerateToken(ctx context.Context, r *GenerateRequest) (*Reply, error) {
	tok, err := jwt.NewBuilder().
		Issuer(`student-id-provider`).
		IssuedAt(time.Now()).
		Expiration(time.Now().UTC().Add(s.tokenValidity)).
		NotBefore(time.Now().UTC()).
		// Audience is not required, but it's a good idea to set it.
		// Following the spec, it should be an array of strings containing the
		// audience of the token. "{type}:{entity}:{scope}"
		Audience([]string{`user:current:private`, `app:stud42:public`}).
		// Subject is required, and should be a string containing the subject of
		// the token, usually the user ID.
		Subject(r.UserId).
		// ID is required, and should be a string containing a unique identifier
		// for the token. It's recommended to use a UUID.
		// @TODO generate and set a unique ID to invalidate the token for more security.
		JwtID(uuid.NewString()).
		Build()

	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to build token: %s", err)
	}

	jwkKey := getGlobalSigningJWK()
	signed, err := jwt.Sign(tok, jwt.WithKey(jwkKey.Algorithm(), jwkKey))
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to sign token: %s", err)
	}

	return &Reply{Token: string(signed), Valid: true}, nil
}

func (s *server) ValidateToken(ctx context.Context, r *ValidateRequest) (*Reply, error) {
	var err error
	defer func() {
		if err != nil {
			log.Error().Err(err).Msg("failed to validate token")
		}
	}()

	tok, err := jwt.ParseString(r.Token)
	if err != nil {
		log.Error().Err(err).Msg("failed to parse JWT")
		return nil, status.Errorf(codes.InvalidArgument, "failed to parse JWT: %s", err)
	}

	if !tok.Expiration().IsZero() && tok.Expiration().Before(time.Now().UTC()) {
		return nil, status.Errorf(codes.Unauthenticated, "token expired")
	}

	if r.Regenerate {
		tok.Expiration().Add(s.tokenValidity)

		jwkKey := getGlobalSigningJWK()
		signed, err := jwt.Sign(tok, jwt.WithKey(jwkKey.Algorithm(), jwkKey))
		if err != nil {
			return nil, status.Errorf(codes.Internal, "failed to sign token: %s", err)
		}

		return &Reply{Token: string(signed), Valid: true}, nil
	}

	return &Reply{Valid: true}, nil
}
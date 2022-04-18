package jwtks

import (
	"encoding/json"
	"fmt"
	"net"
	"net/http"

	sentryhttp "github.com/getsentry/sentry-go/http"
	"github.com/go-chi/chi"
	"github.com/rs/cors"
	"github.com/rs/zerolog/log"
)

func ServeHTTP(port *string) error {
	lis, err := net.Listen("tcp", fmt.Sprintf(":%s", *port))
	if err != nil {
		log.Fatal().Msgf("failed to listen: %v", err)
	}

	router := chi.NewRouter()
	router.Use(cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "Sentry-Trace"},
		AllowCredentials: true,
	}).Handler)

	sentryHandler := sentryhttp.New(sentryhttp.Options{
		Repanic:         true,
		WaitForDelivery: true,
	})

	router.Handle("/jwks", sentryHandler.HandleFunc(jwksHandler))

	log.Info().Msgf("server http listening at %v", lis.Addr())
	return http.Serve(lis, router)
}

func jwksHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	b, err := json.Marshal(GetKeySet())
	if err != nil {
		log.Fatal().Err(err).Msg("failed to marshal jwks")
	}

	if _, err = w.Write(b); err != nil {
		log.Fatal().Err(err).Msg("failed to write jwks")
	}
}
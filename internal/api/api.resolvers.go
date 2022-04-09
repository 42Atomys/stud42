package api

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	apigen "atomys.codes/stud42/internal/api/generated"
	typesgen "atomys.codes/stud42/internal/api/generated/types"
	"atomys.codes/stud42/internal/models/generated"
	"atomys.codes/stud42/internal/models/generated/account"
	"atomys.codes/stud42/internal/models/generated/user"
	"github.com/google/uuid"
)

func (r *mutationResolver) CreateUser(ctx context.Context, input typesgen.CreateUserInput) (uuid.UUID, error) {
	return r.client.User.Create().
		SetEmail(input.Email).
		SetDuoLogin(input.DuoLogin).
		SetDuoID(input.DuoID).
		SetFirstName(input.FirstName).
		SetNillableUsualFirstName(input.UsualFirstName).
		SetLastName(input.LastName).
		SetPoolYear(input.PoolYear).
		SetPoolMonth(input.PoolMonth).
		SetPhone(input.Phone).
		OnConflictColumns(user.FieldDuoID).
		UpdateDuoID().
		ID(ctx)
}

func (r *mutationResolver) LinkAccount(ctx context.Context, input typesgen.LinkAccountInput) (*generated.Account, error) {
	id, err := r.client.Account.Create().
		SetProvider(input.Provider.String()).
		SetProviderAccountID(input.ProviderAccountID).
		SetType(input.Type.String()).
		SetAccessToken(input.AccessToken).
		SetNillableRefreshToken(input.RefreshToken).
		SetTokenType(input.TokenType).
		SetNillableExpiresAt(input.ExpiresAt).
		SetScope(input.Scope).
		SetUserID(uuid.MustParse(input.UserID)).
		OnConflictColumns(account.FieldProvider, account.FieldProviderAccountID).
		UpdateNewValues().
		ID(ctx)
	if err != nil {
		return nil, err
	}

	return r.client.Account.Get(ctx, id)
}

func (r *queryResolver) Me(ctx context.Context) (*generated.User, error) {
	// if user := ForContext(ctx); user == nil {
	// 	return nil, fmt.Errorf("access denied")
	// }

	// return ForContext(ctx), nil
	return nil, fmt.Errorf("not implemented")
}

func (r *queryResolver) InternalGetUserByAccount(ctx context.Context, provider typesgen.Provider, uid string) (*generated.User, error) {
	return r.client.Account.Query().
		Where(account.Provider(provider.String()), account.ProviderAccountID(uid)).
		QueryUser().
		Only(ctx)
}

func (r *queryResolver) InternalGetUserByEmail(ctx context.Context, email string) (*generated.User, error) {
	return r.client.User.Query().
		Where(user.Email(email)).
		Only(ctx)
}

func (r *queryResolver) InternalGetUser(ctx context.Context, id uuid.UUID) (*generated.User, error) {
	return r.client.User.Get(ctx, id)
}

func (r *userResolver) PoolYear(ctx context.Context, obj *generated.User) (*int, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *userResolver) PoolMonth(ctx context.Context, obj *generated.User) (*int, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *accountWhereInputResolver) UserID(ctx context.Context, obj *generated.AccountWhereInput, data *string) error {
	panic(fmt.Errorf("not implemented"))
}

func (r *accountWhereInputResolver) UserIDNeq(ctx context.Context, obj *generated.AccountWhereInput, data *string) error {
	panic(fmt.Errorf("not implemented"))
}

func (r *accountWhereInputResolver) UserIDIn(ctx context.Context, obj *generated.AccountWhereInput, data []string) error {
	panic(fmt.Errorf("not implemented"))
}

func (r *accountWhereInputResolver) UserIDNotIn(ctx context.Context, obj *generated.AccountWhereInput, data []string) error {
	panic(fmt.Errorf("not implemented"))
}

func (r *accountWhereInputResolver) ID(ctx context.Context, obj *generated.AccountWhereInput, data *string) error {
	panic(fmt.Errorf("not implemented"))
}

func (r *accountWhereInputResolver) IDNeq(ctx context.Context, obj *generated.AccountWhereInput, data *string) error {
	panic(fmt.Errorf("not implemented"))
}

func (r *accountWhereInputResolver) IDIn(ctx context.Context, obj *generated.AccountWhereInput, data []string) error {
	panic(fmt.Errorf("not implemented"))
}

func (r *accountWhereInputResolver) IDNotIn(ctx context.Context, obj *generated.AccountWhereInput, data []string) error {
	panic(fmt.Errorf("not implemented"))
}

func (r *accountWhereInputResolver) IDGt(ctx context.Context, obj *generated.AccountWhereInput, data *string) error {
	panic(fmt.Errorf("not implemented"))
}

func (r *accountWhereInputResolver) IDGte(ctx context.Context, obj *generated.AccountWhereInput, data *string) error {
	panic(fmt.Errorf("not implemented"))
}

func (r *accountWhereInputResolver) IDLt(ctx context.Context, obj *generated.AccountWhereInput, data *string) error {
	panic(fmt.Errorf("not implemented"))
}

func (r *accountWhereInputResolver) IDLte(ctx context.Context, obj *generated.AccountWhereInput, data *string) error {
	panic(fmt.Errorf("not implemented"))
}

func (r *userWhereInputResolver) ID(ctx context.Context, obj *generated.UserWhereInput, data *string) error {
	panic(fmt.Errorf("not implemented"))
}

func (r *userWhereInputResolver) IDNeq(ctx context.Context, obj *generated.UserWhereInput, data *string) error {
	panic(fmt.Errorf("not implemented"))
}

func (r *userWhereInputResolver) IDIn(ctx context.Context, obj *generated.UserWhereInput, data []string) error {
	panic(fmt.Errorf("not implemented"))
}

func (r *userWhereInputResolver) IDNotIn(ctx context.Context, obj *generated.UserWhereInput, data []string) error {
	panic(fmt.Errorf("not implemented"))
}

func (r *userWhereInputResolver) IDGt(ctx context.Context, obj *generated.UserWhereInput, data *string) error {
	panic(fmt.Errorf("not implemented"))
}

func (r *userWhereInputResolver) IDGte(ctx context.Context, obj *generated.UserWhereInput, data *string) error {
	panic(fmt.Errorf("not implemented"))
}

func (r *userWhereInputResolver) IDLt(ctx context.Context, obj *generated.UserWhereInput, data *string) error {
	panic(fmt.Errorf("not implemented"))
}

func (r *userWhereInputResolver) IDLte(ctx context.Context, obj *generated.UserWhereInput, data *string) error {
	panic(fmt.Errorf("not implemented"))
}

// Mutation returns apigen.MutationResolver implementation.
func (r *Resolver) Mutation() apigen.MutationResolver { return &mutationResolver{r} }

// Query returns apigen.QueryResolver implementation.
func (r *Resolver) Query() apigen.QueryResolver { return &queryResolver{r} }

// User returns apigen.UserResolver implementation.
func (r *Resolver) User() apigen.UserResolver { return &userResolver{r} }

// AccountWhereInput returns apigen.AccountWhereInputResolver implementation.
func (r *Resolver) AccountWhereInput() apigen.AccountWhereInputResolver {
	return &accountWhereInputResolver{r}
}

// UserWhereInput returns apigen.UserWhereInputResolver implementation.
func (r *Resolver) UserWhereInput() apigen.UserWhereInputResolver { return &userWhereInputResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type userResolver struct{ *Resolver }
type accountWhereInputResolver struct{ *Resolver }
type userWhereInputResolver struct{ *Resolver }

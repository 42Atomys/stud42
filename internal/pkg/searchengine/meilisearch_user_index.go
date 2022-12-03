package searchengine

import (
	"context"

	"github.com/google/uuid"
	"github.com/meilisearch/meilisearch-go"
	"github.com/rs/zerolog/log"
)

// UserDocument is a struct that represents a user in the MeiliSearch index.
type UserDocument struct {
	ID              uuid.UUID  `json:"id"`
	CurrentCampusID *uuid.UUID `json:"current_campus_id"`
	DuoLogin        string     `json:"duo_login"`
	FirstName       string     `json:"first_name"`
	UsualFirstName  *string    `json:"usual_first_name"`
	LastName        string     `json:"last_name"`
}

const (
	// IndexUser is the name of the MeiliSearch index for users.
	IndexUser = "s42_users"
	// IndexUserPrimaryKey is the primary key for the MeiliSearch index
	// for users.
	IndexUserPrimaryKey = "id"
)

func (c *Client) EnsureUserIndex() error {
	// Create index if it doesn't exist
	if _, err := c.GetIndex(IndexUser); err != nil {
		if _, err := c.CreateIndex(&meilisearch.IndexConfig{
			Uid:        IndexUser,
			PrimaryKey: IndexUserPrimaryKey,
		}); err != nil {
			return err
		}
		log.Info().Msgf("created index %s on meilisearch", IndexUser)
	}

	// User index
	_, err := c.Client.Index(IndexUser).UpdateSettings(&meilisearch.Settings{
		TypoTolerance: &meilisearch.TypoTolerance{
			Enabled: true,
			MinWordSizeForTypos: meilisearch.MinWordSizeForTypos{
				OneTypo:  1,
				TwoTypos: 3,
			},
		},
		Pagination: &meilisearch.Pagination{
			MaxTotalHits: 10,
		},
		SearchableAttributes: []string{"duo_login", "first_name", "last_name", "usual_first_name"},
		// Only display the user id in the search results to avoid leaking information
		// about the user.
		DisplayedAttributes: []string{IndexUserPrimaryKey},
	})
	if err != nil {
		return err
	}
	return nil
}

// UpdateUserDocument updates the MeiliSearch document for the given user. It
// should be called when a user is created or updated. It will create the
// document if it doesn't exist. It will update it if it does.
func (c *Client) UpdateUserDocument(ctx context.Context, document *UserDocument) error {
	// Update user document
	_, err := c.Client.Index(IndexUser).UpdateDocuments(document, IndexUserPrimaryKey)
	return err
}

// DeleteUserDocument deletes the MeiliSearch document for the given user. It
// should be called when a user is deleted. It will do nothing if the document

func (c *Client) DeleteUserDocument(userID uuid.UUID) error {
	_, err := c.Client.Index(IndexUser).DeleteDocument(userID.String())
	return err
}

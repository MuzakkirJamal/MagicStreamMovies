package database

import (
	"context"
	"crypto/tls"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func Connect() *mongo.Client {
	// Try to load .env, but don't fail if not found (for production)
	_ = godotenv.Load(".env")

	MongoDb := os.Getenv("MONGODB_URI")
	if MongoDb == "" {
		log.Fatal("MONGODB_URI not set in environment variables!")
		return nil
	}

	fmt.Println("MongoDB URI: ", MongoDb)

	// Configure TLS to handle Atlas connection
	tlsConfig := &tls.Config{
		InsecureSkipVerify: true, // Set to true to bypass SSL verification
	}

	clientOptions := options.Client().
		ApplyURI(MongoDb).
		SetTLSConfig(tlsConfig).
		SetServerSelectionTimeout(30 * time.Second)

	client, err := mongo.Connect(clientOptions)
	if err != nil {
		log.Printf("Failed to create MongoDB client: %v", err)
		return nil
	}

	// Test the connection
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	err = client.Ping(ctx, nil)
	if err != nil {
		log.Printf("Failed to ping MongoDB: %v", err)
		// Don't return nil yet, try to continue
	}

	fmt.Println("✅ MongoDB client created!")
	return client
}

func OpenCollection(collectionName string, client *mongo.Client) *mongo.Collection {
	if client == nil {
		log.Println("Error: MongoDB client is nil")
		return nil
	}

	// Try to load .env, but don't fail if not found
	_ = godotenv.Load(".env")

	databaseName := os.Getenv("DATABASE_NAME")
	if databaseName == "" {
		log.Fatal("DATABASE_NAME not set in environment variables!")
		return nil
	}

	fmt.Println("DATABASE_NAME: ", databaseName)

	collection := client.Database(databaseName).Collection(collectionName)
	return collection
}

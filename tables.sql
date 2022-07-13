CREATE TABLE "companies" (
    id serial NOT NULL PRIMARY KEY,
	name text UNIQUE NOT NULL,
	"apiKey" text
)

CREATE TYPE card AS ENUM ('groceries', 'restaurant', 'transport', 'education', 'health');

CREATE TABLE "employees" (
    id serial NOT NULL PRIMARY KEY,
	"fullName" text NOT NULL,
	cpf text UNIQUE NOT NULL,
	email text UNIQUE NOT NULL,
	"companyId" integer NOT NULL REFERENCES companies(id)
)

CREATE TABLE "cards" (
    id serial NOT NULL PRIMARY KEY,
	"employeeId" integer REFERENCES employees(id) NOT NULL,
	number text UNIQUE NOT NULL,
	"cardholderName" text NOT NULL,
	"securityCode" text NOT NULL,
	"expirationDate" text NOT NULL,
	password text,
	"isVirtual" boolean NOT NULL,
	"originalCardId" integer REFERENCES cards(id),
	"isBlocked" boolean NOT NULL,
	type card	
)

CREATE TABLE "businesses" (
    id serial NOT NULL PRIMARY KEY,
	name text UNIQUE NOT NULL,
	type card	
)

CREATE TABLE "payments" (
    id serial NOT NULL PRIMARY KEY,
	"cardId" integer REFERENCES cards(id) NOT NULL,
	"businessId" integer REFERENCES businesses(id) NOT NULL,
	"timestamp" timestamp NOT NULL DEFAULT NOW(),
	amount integer NOT NULL
)

CREATE TABLE "recharges" (
    id serial NOT NULL PRIMARY KEY,
	"cardId" integer REFERENCES cards(id) NOT NULL,
	"timestamp" timestamp NOT NULL DEFAULT NOW(),
	amount integer NOT NULL
)
-- Your SQL goes here
CREATE TABLE "tanks"(
	"id" INT4 NOT NULL PRIMARY KEY,
	"name" TEXT NOT NULL,
	"capacity" INT4 NOT NULL
);

CREATE TABLE "collectors"(
	"id" INT4 NOT NULL PRIMARY KEY,
	"name" TEXT NOT NULL
);

CREATE TABLE "withdrawals"(
	"id" INT4 NOT NULL PRIMARY KEY,
	"tank_id" INT4 NOT NULL,
	"quantity" INT4 NOT NULL,
	"date" DATE NOT NULL,
	"time" TIMESTAMP NOT NULL,
	FOREIGN KEY ("tank_id") REFERENCES "tanks"("id")
);

CREATE TABLE "producers"(
	"id" INT4 NOT NULL PRIMARY KEY,
	"name" TEXT NOT NULL,
	"day_shift" BOOL NOT NULL,
	"night_shift" BOOL NOT NULL
);

CREATE TABLE "collections"(
	"id" INT4 NOT NULL PRIMARY KEY,
	"producer_id" INT4 NOT NULL,
	"collector_id" INT4,
	"tank_id" INT4 NOT NULL,
	"quantity" INT4 NOT NULL,
	"date" DATE NOT NULL,
	"time" TIMESTAMP NOT NULL,
	FOREIGN KEY ("producer_id") REFERENCES "producers"("id"),
	FOREIGN KEY ("collector_id") REFERENCES "collectors"("id"),
	FOREIGN KEY ("tank_id") REFERENCES "tanks"("id")
);


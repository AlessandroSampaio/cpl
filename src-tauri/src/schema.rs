// @generated automatically by Diesel CLI.

diesel::table! {
    collections (id) {
        id -> Int4,
        producer_id -> Int4,
        collector_id -> Nullable<Int4>,
        tank_id -> Int4,
        quantity -> Numeric,
        date -> Date,
    }
}

diesel::table! {
    collectors (id) {
        id -> Int4,
        name -> Text,
    }
}

diesel::table! {
    producers (id) {
        id -> Int4,
        name -> Text,
        day_shift -> Bool,
        night_shift -> Bool,
    }
}

diesel::table! {
    tanks (id) {
        id -> Int4,
        name -> Text,
        capacity -> Numeric,
    }
}

diesel::table! {
    withdrawals (id) {
        id -> Int4,
        tank_id -> Int4,
        quantity -> Numeric,
        date -> Date,
    }
}

diesel::joinable!(collections -> collectors (collector_id));
diesel::joinable!(collections -> producers (producer_id));
diesel::joinable!(collections -> tanks (tank_id));
diesel::joinable!(withdrawals -> tanks (tank_id));

diesel::allow_tables_to_appear_in_same_query!(
    collections,
    collectors,
    producers,
    tanks,
    withdrawals,
);

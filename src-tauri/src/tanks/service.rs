#[taurpc::ipc_type]
#[derive(Queryable, Selectable, Debug)]
#[diesel(table_name = tanks)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Tank {
    pub id: i32,
    pub name: String,
    pub capacity: i32,
}

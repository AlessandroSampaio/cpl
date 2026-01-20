use crate::collectors::model::{Collector, NewCollector};
use crate::db::establish_connection;
use crate::errors::IpcError;
use crate::schema::collectors::dsl::*;
use diesel::prelude::*;
use diesel::{RunQueryDsl, SelectableHelper};

#[taurpc::procedures(path = "collectors")]
pub trait CollectorService {
    async fn create_collector(collector: NewCollector) -> Result<Collector, IpcError>;
    async fn list_collectors() -> Result<Vec<Collector>, IpcError>;
    async fn delete_collector(collector_id: i32) -> Result<(), IpcError>;
    async fn get_collector(collector_id: i32) -> Result<Collector, IpcError>;
    async fn update_collector(
        collector_id: i32,
        collector: NewCollector,
    ) -> Result<Collector, IpcError>;
}

#[derive(Clone)]
pub struct CollectorServiceImpl;

#[taurpc::resolvers]
impl CollectorService for CollectorServiceImpl {
    async fn create_collector(self, collector: NewCollector) -> Result<Collector, IpcError> {
        println!("Creating collector, {:?}", collector);

        let connection = &mut establish_connection();

        let created_collector = diesel::insert_into(collectors)
            .values(&collector)
            .returning(Collector::as_returning())
            .get_result(connection)?;

        return Ok(created_collector);
    }

    async fn list_collectors(self) -> Result<Vec<Collector>, IpcError> {
        let connection = &mut establish_connection();

        let list_collectors = collectors.select(Collector::as_select()).load(connection)?;

        Ok(list_collectors)
    }

    async fn delete_collector(self, collector_id: i32) -> Result<(), IpcError> {
        let connection = &mut establish_connection();

        diesel::delete(collectors.filter(id.eq(collector_id))).execute(connection)?;
        Ok(())
    }

    async fn get_collector(self, collector_id: i32) -> Result<Collector, IpcError> {
        let connection = &mut establish_connection();

        let collector = collectors
            .filter(id.eq(collector_id))
            .select(Collector::as_select())
            .first(connection)?;
        Ok(collector)
    }

    async fn update_collector(
        self,
        collector_id: i32,
        collector: NewCollector,
    ) -> Result<Collector, IpcError> {
        let connection = &mut establish_connection();

        let updated_collector = diesel::update(collectors.filter(id.eq(collector_id)))
            .set(&collector)
            .returning(Collector::as_returning())
            .get_result(connection)?;
        Ok(updated_collector)
    }
}

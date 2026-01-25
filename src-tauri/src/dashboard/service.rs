use crate::dashboard::model::CollectionByProducer;
use crate::{
    db::establish_connection,
    errors::IpcError,
    schema::{collections, producers},
};
use diesel::dsl::sum;
use diesel::{QueryDsl, RunQueryDsl};

#[taurpc::procedures(path = "dashboard")]
pub trait DashboardService {
    async fn get_producer_data() -> Result<Vec<CollectionByProducer>, IpcError>;
}

#[derive(Clone)]
pub struct DashboardServiceImpl;

#[taurpc::resolvers]
impl DashboardService for DashboardServiceImpl {
    async fn get_producer_data(self) -> Result<Vec<CollectionByProducer>, IpcError> {
        // Implementation goes here
        println!("Searching producer data...");
        let connection = &mut establish_connection();

        let result: Vec<CollectionByProducer> = producers::table
            .inner_join(collections::table)
            .group_by((producers::id, producers::name))
            .select((producers::id, producers::name, sum(collections::quantity)))
            .load::<CollectionByProducer>(connection)?;

        Ok(result)
    }
}

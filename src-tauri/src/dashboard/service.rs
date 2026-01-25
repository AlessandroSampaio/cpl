use crate::dashboard::model::{CollectionByCollector, CollectionByDateRange, CollectionByProducer};
use crate::{
    db::establish_connection,
    errors::IpcError,
    schema::{collections, collectors, producers},
};
use chrono::NaiveDate;
use diesel::dsl::sum;
use diesel::ExpressionMethods;
use diesel::{QueryDsl, RunQueryDsl};

#[taurpc::procedures(path = "dashboard")]
pub trait DashboardService {
    async fn get_producer_data() -> Result<Vec<CollectionByProducer>, IpcError>;
    async fn get_collector_data() -> Result<Vec<CollectionByCollector>, IpcError>;
    async fn get_collection_by_date_range(
        start_date: NaiveDate,
        end_date: NaiveDate,
    ) -> Result<Vec<CollectionByDateRange>, IpcError>;
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
            .limit(5)
            .load::<CollectionByProducer>(connection)?;

        Ok(result)
    }

    async fn get_collector_data(self) -> Result<Vec<CollectionByCollector>, IpcError> {
        // Implementation goes here
        println!("Searching producer data...");
        let connection = &mut establish_connection();

        let result: Vec<CollectionByCollector> = collectors::table
            .inner_join(collections::table)
            .group_by((collectors::id, collectors::name))
            .select((collectors::id, collectors::name, sum(collections::quantity)))
            .limit(5)
            .load::<CollectionByCollector>(connection)?;

        Ok(result)
    }

    async fn get_collection_by_date_range(
        self,
        start_date: NaiveDate,
        end_date: NaiveDate,
    ) -> Result<Vec<CollectionByDateRange>, IpcError> {
        // Implementation goes here
        println!("Searching collection data...");
        let connection = &mut establish_connection();

        let result: Vec<CollectionByDateRange> = collections::table
            .filter(collections::date.between(start_date, end_date))
            .group_by((collections::date,))
            .select((collections::date, sum(collections::quantity)))
            .load::<CollectionByDateRange>(connection)?;

        Ok(result)
    }
}

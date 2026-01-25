use crate::dashboard::model::{CollectionByCollector, CollectionByProducer, TankMovByDateRange};
use crate::{
    db::establish_connection,
    errors::IpcError,
    schema::{collections, collectors, producers},
};
use chrono::NaiveDate;
use diesel::dsl::sum;
use diesel::sql_query;
use diesel::sql_types::Date;
use diesel::{debug_query, ExpressionMethods};
use diesel::{QueryDsl, RunQueryDsl};

#[taurpc::procedures(path = "dashboard")]
pub trait DashboardService {
    async fn get_producer_data(
        start_date: NaiveDate,
        end_date: NaiveDate,
    ) -> Result<Vec<CollectionByProducer>, IpcError>;
    async fn get_collector_data(
        start_date: NaiveDate,
        end_date: NaiveDate,
    ) -> Result<Vec<CollectionByCollector>, IpcError>;
    async fn get_collection_by_date_range(
        start_date: NaiveDate,
        end_date: NaiveDate,
    ) -> Result<Vec<TankMovByDateRange>, IpcError>;
}

#[derive(Clone)]
pub struct DashboardServiceImpl;

#[taurpc::resolvers]
impl DashboardService for DashboardServiceImpl {
    async fn get_producer_data(
        self,
        start_date: NaiveDate,
        end_date: NaiveDate,
    ) -> Result<Vec<CollectionByProducer>, IpcError> {
        println!("Searching producer data...");
        let connection = &mut establish_connection();

        let result: Vec<CollectionByProducer> = producers::table
            .inner_join(collections::table)
            .filter(collections::date.between(start_date, end_date))
            .group_by((producers::id, producers::name))
            .select((producers::id, producers::name, sum(collections::quantity)))
            .limit(5)
            .load::<CollectionByProducer>(connection)?;

        Ok(result)
    }

    async fn get_collector_data(
        self,
        start_date: NaiveDate,
        end_date: NaiveDate,
    ) -> Result<Vec<CollectionByCollector>, IpcError> {
        println!("Searching producer data...");
        let connection = &mut establish_connection();

        let result: Vec<CollectionByCollector> = collectors::table
            .inner_join(collections::table)
            .filter(collections::date.between(start_date, end_date))
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
    ) -> Result<Vec<TankMovByDateRange>, IpcError> {
        println!(
            "Searching collection data... for the range of {} to {}",
            start_date, end_date
        );
        let connection = &mut establish_connection();

        let sql = "select coalesce(c.date, w.date) as date, coalesce(sum(c.quantity),0) as total_collections, coalesce(sum(w.quantity ),0) as total_withdrawals
        from withdrawals w full outer join collections c on c.date = w.date where c.date between $1 and $2 or w.date between $1 and $2 group by c.date, w.date;";

        let query = sql_query(sql)
            .bind::<Date, _>(start_date)
            .bind::<Date, _>(end_date);

        // Get a more structured debug output
        let debug_output = format!("{:?}", debug_query::<diesel::pg::Pg, _>(&query));
        println!("Debug Output: {}", debug_output);

        let result: Vec<TankMovByDateRange> = query.load::<TankMovByDateRange>(connection)?;

        Ok(result)
    }
}

use crate::db::establish_connection;
use crate::errors::IpcError;
use crate::producers::model::{NewProducer, Producer};
use crate::schema::producers::dsl::*;
use diesel::prelude::*;
use diesel::{RunQueryDsl, SelectableHelper};

#[taurpc::procedures(path = "producers")]
pub trait ProducerService {
    async fn create_producer(producer: NewProducer) -> Result<Producer, IpcError>;
    async fn list_producers() -> Result<Vec<Producer>, IpcError>;
    async fn delete_producer(producer_id: i32) -> Result<(), IpcError>;
    async fn get_producer(producer_id: i32) -> Result<Producer, IpcError>;
    async fn update_producer(producer_id: i32, producer: NewProducer)
        -> Result<Producer, IpcError>;
}

#[derive(Clone)]
pub struct ProducerServiceImpl;

#[taurpc::resolvers]
impl ProducerService for ProducerServiceImpl {
    async fn create_producer(self, producer: NewProducer) -> Result<Producer, IpcError> {
        println!("Creating producer, {:?}", producer);

        let connection = &mut establish_connection();

        let created_producer = diesel::insert_into(producers)
            .values(&producer)
            .returning(Producer::as_returning())
            .get_result(connection)?;

        return Ok(created_producer);
    }

    async fn list_producers(self) -> Result<Vec<Producer>, IpcError> {
        let connection = &mut establish_connection();

        let list_producers = producers.select(Producer::as_select()).load(connection)?;

        Ok(list_producers)
    }

    async fn delete_producer(self, producer_id: i32) -> Result<(), IpcError> {
        let connection = &mut establish_connection();

        diesel::delete(producers.filter(id.eq(producer_id))).execute(connection)?;
        Ok(())
    }

    async fn get_producer(self, producer_id: i32) -> Result<Producer, IpcError> {
        let connection = &mut establish_connection();

        let producer = producers
            .filter(id.eq(producer_id))
            .select(Producer::as_select())
            .first(connection)?;
        Ok(producer)
    }

    async fn update_producer(
        self,
        producer_id: i32,
        producer: NewProducer,
    ) -> Result<Producer, IpcError> {
        let connection = &mut establish_connection();

        let updated_producer = diesel::update(producers.filter(id.eq(producer_id)))
            .set(&producer)
            .returning(Producer::as_returning())
            .get_result(connection)?;
        Ok(updated_producer)
    }
}

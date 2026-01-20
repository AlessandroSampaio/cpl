use crate::errors::IpcError;
use crate::producers::model::{NewProducer, Producer};
// use crate::schema::producers::dsl::*;

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
    async fn create_producer(self, _producer: NewProducer) -> Result<Producer, IpcError> {
        unimplemented!();
    }

    async fn list_producers(self) -> Result<Vec<Producer>, IpcError> {
        unimplemented!();
    }

    async fn delete_producer(self, _producer_id: i32) -> Result<(), IpcError> {
        unimplemented!();
    }

    async fn get_producer(self, _producer_id: i32) -> Result<Producer, IpcError> {
        unimplemented!();
    }

    async fn update_producer(
        self,
        _producer_id: i32,
        _producer: NewProducer,
    ) -> Result<Producer, IpcError> {
        unimplemented!();
    }
}

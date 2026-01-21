use crate::{
    collections::model::{Collection, NewCollection},
    db::establish_connection,
    errors::IpcError,
    schema::collections::dsl::*,
};
use diesel::{prelude::*, SelectableHelper};

#[taurpc::procedures(path = "collections")]
pub trait CollectionService {
    async fn create_collection(new_collection: NewCollection) -> Result<Collection, IpcError>;
    async fn list_collections() -> Result<Vec<Collection>, IpcError>;
    async fn delete_collection(collection_id: i32) -> Result<(), IpcError>;
    async fn get_collection(collection_id: i32) -> Result<Collection, IpcError>;
    async fn update_collection(
        collection_id: i32,
        collection: NewCollection,
    ) -> Result<Collection, IpcError>;
}

#[derive(Clone)]
pub struct CollectionServiceImpl;

#[taurpc::resolvers]
impl CollectionService for CollectionServiceImpl {
    async fn create_collection(
        self,
        new_collection: NewCollection,
    ) -> Result<Collection, IpcError> {
        println!("Creating collection {:?}", new_collection);

        let connection = &mut establish_connection();

        let created_collection = diesel::insert_into(collections)
            .values(&new_collection)
            .returning(Collection::as_returning())
            .get_result(connection)?;

        Ok(created_collection)
    }

    async fn list_collections(self) -> Result<Vec<Collection>, IpcError> {
        let connection = &mut establish_connection();

        let list_collection = collections
            .select(Collection::as_select())
            .load(connection)?;

        Ok(list_collection)
    }

    async fn delete_collection(self, collection_id: i32) -> Result<(), IpcError> {
        let connection = &mut establish_connection();

        diesel::delete(collections.filter(id.eq(collection_id))).execute(connection)?;
        Ok(())
    }

    async fn get_collection(self, collection_id: i32) -> Result<Collection, IpcError> {
        let connection = &mut establish_connection();

        let collector = collections
            .filter(id.eq(collection_id))
            .select(Collection::as_select())
            .first(connection)?;
        Ok(collector)
    }

    async fn update_collection(
        self,
        collection_id: i32,
        collection: NewCollection,
    ) -> Result<Collection, IpcError> {
        let connection = &mut establish_connection();

        let updated_collection = diesel::update(collections.filter(id.eq(collection_id)))
            .set(&collection)
            .returning(Collection::as_returning())
            .get_result(connection)?;
        Ok(updated_collection)
    }
}

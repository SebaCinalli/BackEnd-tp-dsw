import { PrimaryKey, DateTimeType, Property } from "@mikro-orm/core";

export abstract class BaseEntity {
    @PrimaryKey()
    id ?: number;

    /*
    @Property({ type: DateTimeType })
    createdAt? = new Date();   // Fecha de creación del registro

    @Property({ 
    type: DateTimeType, 
    onupdate: () => new Date()
    })
    updatedAt? = new Date(); // Fecha de última actualización del registro

    */
}
import { PrimaryKey, DateTimeType, Property, Entity } from "@mikro-orm/core";


export abstract class BaseEntity {
  @PrimaryKey({ autoincrement: true })  // Asegúrate de incluir autoincrement
  id!: number;  // Usa tipo number (no opcional)

  // Opcional: mantén las fechas si las necesitas
  @Property({ type: DateTimeType })
  createdAt = new Date();

  @Property({ type: DateTimeType, onUpdate: () => new Date() })
  updatedAt = new Date();
}
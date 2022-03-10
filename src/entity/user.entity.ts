import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("user")
export class User {
   @PrimaryColumn()
   id: number

   @Column()
   username: string

   @Column()
   name: string

   @Column({ unique: true })
   email: string

   @Column()
   password: string

   @Column()
   confirm_password: string
}
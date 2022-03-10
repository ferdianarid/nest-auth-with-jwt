import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class User {
   @PrimaryGeneratedColumn()
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
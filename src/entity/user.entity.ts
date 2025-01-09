import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: "users"}) 
export class User {
    @PrimaryGeneratedColumn()
    readonly id!: number

    @Column({
        type: "varchar",
        nullable: false,
    })
    name!: string

    @Column({
        type: "varchar",
        nullable: false,
    })
    first_name!: string

    @Column({
        type: "varchar",
        nullable: true,
    })
    email!: string

    @Column({
        type: "varchar",
        nullable: false,
        unique: true
    })
    phone!: string

    @Column({
        type: "varchar",
        nullable: false,
    })
    refcode!: string

    @Column({
        type: "varchar",
        nullable: false,
    })
    password!: string
    
    @Column({
        type: "varchar"
    })
    role!: string
    // status: number,
    // created_at: string,
    // updated_at: string,
    // title: string,
    // wallet_m: number,
    // wallet_c: number,
    // commission_rate: number,
    // user_id: number,
    // is_hot: number,
    // boostscore: number,
    // image: string,
    // banner: string,
    // introduce: string,
    // full_content: string
}
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema({
    toJSON: {
        virtuals: true,
        transform: function (_doc, ret) {
            ret.id = ret._id.toString();
            delete ret._id;
            delete ret.__v;
        },
    },
    toObject: {
        virtuals: true,
        transform: function (_doc, ret) {
            ret.id = ret._id.toString();
            delete ret._id;
            delete ret.__v;
        },
    },
})
export class Admin {
    get id(): string {
        return this.id.toString();
    }

    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({required: true})
    name: string;

    @Prop({default: false})
    superAdmin: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);

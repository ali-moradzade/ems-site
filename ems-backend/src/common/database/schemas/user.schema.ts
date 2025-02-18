import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export interface UserDocument extends Document {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

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
export class User {
    get id(): string {
        return this.id.toString();
    }

    @Prop({required: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({required: true})
    firstName: string;

    @Prop({required: true})
    lastName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

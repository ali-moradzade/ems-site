import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';

export interface JobDocument extends Document {
    id: string;
    title: string;
    description: string;
    companyId: string;
    creationDate: Date;
    expirationDate: Date;
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
export class Job {
    get id(): string {
        return this.id.toString();
    }

    @Prop({required: true})
    title: string;

    @Prop({required: true})
    description: string;

    @Prop({type: Types.ObjectId, ref: 'Company', required: true})
    _companyId: Types.ObjectId;

    @Prop({required: true, default: new Date()})
    creationDate: Date;

    @Prop({required: true})
    expirationDate: Date;
}

export const JobSchema = SchemaFactory.createForClass(Job);

JobSchema.virtual('companyId').get(function () {
    return this._companyId.toString();
});

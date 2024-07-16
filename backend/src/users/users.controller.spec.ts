import {beforeEach, describe, expect, it} from "vitest";
import {Test, TestingModule} from '@nestjs/testing';
import {UsersController} from './users.controller';
import {AuthService} from "./auth.service";
import {UsersService} from "./users.service";

describe('UsersController', () => {
    let controller: UsersController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: {}
                },
                {
                    provide: AuthService,
                    useValue: {}
                },
            ]
        }).compile();

        controller = module.get<UsersController>(UsersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});

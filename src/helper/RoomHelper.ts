import { IRoom, RoomType } from '@rocket.chat/apps-engine/definition/rooms';

export abstract class RoomHelper {

    public static isLiveChat(room: IRoom): boolean {
        return (room.type === RoomType.LIVE_CHAT);
    }

}

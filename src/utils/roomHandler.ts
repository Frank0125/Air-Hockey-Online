import { Room } from '@/interfaces/Room';
import { Server, Socket } from 'socket.io';

interface RoomCreatePayload {
    type: 'friend' | 'stranger';
}

const createID = (): string => {
    return crypto.randomUUID(); // Generates a unique ID
};

const roomHandler = (io: Server, socket: Socket, rooms: Room[]) => {
    const create = (payload: RoomCreatePayload, callback: (error: Error | null, result: string | null) => void) => {
        if (!payload || !payload.type) {
            return callback(new Error("Invalid payload"), null);
        }

        if (payload.type === "stranger") {
            const index = rooms.findIndex((room: Room) => room.vacant === true);
            if (index >= 0) {
                const room = rooms[index]; // get the first vacant room
                room.players[socket.id] = { // add the player to the room with no message
                    message: null
                }
                room.vacant = false;
                socket.join(room.roomId);
                io.to(room.roomId).emit("room:get", room);
                callback(null, room.roomId);
            }
        }

        const room = {
            roomId: createID(),
            players: {
                [socket.id]: {
                    message:  null
                },
            },
            vacant: true,
            chat:  null
        }

        rooms.push(room);
        socket.join(room.roomId);
        io.to(room.roomId).emit("room:get", room);
        callback(null, room.roomId);
    }

    const update = (roomId: string, playerMessage: string, callback: (error: Error | null, result: string | null) => void) => {
        if (!roomId || typeof roomId !== 'string') {
            return callback(new Error("Invalid room ID"), null);
        }

        console.log(rooms);

        const index = rooms.findIndex((room) => room.roomId === roomId);
        if (index >= 0) {
            const room = rooms[index];
            room.players[socket.id].message = playerMessage;
            //chat
            room.chat = playerMessage;
            io.to(room.roomId).emit("room:get", room);
            callback(null, "Saved");
        } else {
            callback(new Error("Room not found"), null);
        }
    }

    const receive = (roomId: string, callback: (error: Error | null, result: string | null) => void) => {
        if (!roomId || typeof roomId !== 'string') {
            return callback(new Error("Invalid room ID"), null);
        }

        const index = rooms.findIndex((room) => room.roomId === roomId);
        if (index >= 0) {
            const room = rooms[index];
            //const data = room.players[socket.id].message;
            //chat
            const data = room.chat;
            io.to(room.roomId).emit("room:get", room);
            callback(null, data);
        } else {
            callback(new Error("Room not found"), null);
        }
    }

    socket.on("disconnect", () => {
        const roomIndex = rooms.findIndex(room => 
            Object.keys(room.players).includes(socket.id)
        );
        
        if (roomIndex >= 0) {
            const room = rooms[roomIndex];
            delete room.players[socket.id];
            
            // Si no quedan jugadores, eliminar la sala
            if (Object.keys(room.players).length === 0) {
                rooms.splice(roomIndex, 1);
            } else {
                // Si quedan jugadores, marcar como vacante
                room.vacant = true;
                io.to(room.roomId).emit("room:get", room);
            }
        }
    });

    socket.on("room:create", create);
    socket.on("room:update", update);
    socket.on("room:receive", receive);
}

export default roomHandler;
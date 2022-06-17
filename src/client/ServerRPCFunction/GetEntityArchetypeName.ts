import { RegisterClientCallback } from "../Callback";

RegisterClientCallback("serverRPC:GetEntityArchetypeName", async (entity: number):Promise<string> => {
	return GetEntityArchetypeName(entity) as string;
})
import axios, { AxiosResponse } from "axios";
import { Policy } from "./policies";

export interface Client {
  id: string;
  name: string;
  email: string;
  role: string;
}
const clientUrl = "http://www.mocky.io/v2/5808862710000087232b75ac";
const policyUrl = "http://www.mocky.io/v2/580891a4100000e8242b75c5";

export const getUser = async (req, res, next) => {
  const { id, name } = req.query;

  if (!id && !name) {
    let err: any = new Error("Bad Request: User must have a name or id");
    err.statusCode = 400;
    return next(err);
  }

  try {
    const results: AxiosResponse = await axios.get(clientUrl);
    const client: Client = id
      ? results.data.clients.find(client => client.id === id)
      : results.data.clients.find(client => client.name === name);
    res.json(
      client || { message: `No client exists with name ${name} or id ${id}` }
    );
  } catch (err) {
    return next(err);
  }
};

export const getUserByPolicyId = async (req, res, next) => {
  const policyId = req.params.id;
  const { role } = req.query;

  if (!policyId) {
    let err: any = new Error("Bad Request: User must have policyId");
    err.statusCode = 400;
    return next(err);
  }

  if (!role || role !== "admin") {
    let err: any = new Error("User is unauthorized");
    err.statusCode = 403;
    return next(err);
  }

  try {
    const policies = await axios.get(policyUrl);
    const clients = await axios.get(clientUrl);
    const clientPolicy: Policy = policies.data.policies.find(
      policy => policy.id === policyId
    );
    const client: Client = clients.data.clients.find(
      client => client.id === clientPolicy.clientId
    );
    res.json(
      client || { message: `No client with a policy id of ${policyId} exists` }
    );
  } catch (err) {
    return next(err);
  }
};

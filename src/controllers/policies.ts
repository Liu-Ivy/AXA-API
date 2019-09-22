import axios, { AxiosResponse } from "axios";
import { Client } from "./users";

export interface Policy {
  id: string;
  amountInsured: number;
  email: string;
  inceptionDate: string;
  installmentPayment: boolean;
  clientId: string;
}

const clientUrl = "http://www.mocky.io/v2/5808862710000087232b75ac";
const policyUrl = "http://www.mocky.io/v2/580891a4100000e8242b75c5";

export const getPoliciesByUserName = async (req, res, next) => {
  const { name, role } = req.query;

  if (role !== "admin") {
    res.json({ message: "user is not allowed" });
  }

  try {
    const clientResults: AxiosResponse = await axios.get(clientUrl);
    const policyResults: AxiosResponse = await axios.get(policyUrl);
    const client: Client = clientResults.data.clients.find(
      client => client.name === name
    );
    const policy: Policy[] = policyResults.data.policies.filter(
      policy => policy.clientId === client.id
    );
    res.json(policy || { message: "User name is in correct" });
  } catch (err) {
    return next(err);
  }
};

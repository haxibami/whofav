import { useEffect, useRef, useState } from "react";

import type { PlasmoMessaging } from "@plasmohq/messaging";
import { listen as messageListen } from "@plasmohq/messaging/message";

// returns promise that resolves with request body
export const getMessage = async <RequestBody, ResponseBody>(
  handler: PlasmoMessaging.Handler<string, RequestBody, ResponseBody>,
) => {
  return new Promise<RequestBody>((resolve) => {
    messageListen<RequestBody, ResponseBody>(async (req, res) => {
      resolve(req.body);
      await handler(req, res);
    });
  });
};

const dataMap: Map<string, any> = new Map();

export const useMessage = <RequestBody, ResponseBody>(
  key: string,
  handler: PlasmoMessaging.Handler<string, RequestBody, ResponseBody>,
) => {
  const data = dataMap.get(key);
  if (data === undefined) {
    throw getMessage<RequestBody, ResponseBody>(handler).then((d) => {
      dataMap.set(key, d);
    });
  }

  return {
    data: data as RequestBody,
  };
};

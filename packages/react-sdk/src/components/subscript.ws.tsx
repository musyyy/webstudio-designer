import { SubscriptIcon } from "@webstudio-is/icons";
import type { WsComponentMeta, WsComponentPropsMeta } from "./component-type";
import props from "./__generated__/subscript.props.json";

export const meta: WsComponentMeta = {
  type: "rich-text-child",
  label: "Subscript Text",
  Icon: SubscriptIcon,
};

export const propsMeta = {
  props,
} as WsComponentPropsMeta;

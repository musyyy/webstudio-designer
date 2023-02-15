import { createCssEngine } from "@webstudio-is/css-engine";
import type { Asset } from "@webstudio-is/asset-uploader";
import type { Tree } from "@webstudio-is/project-build";
import {
  getComponentMeta,
  getComponentNames,
  idAttribute,
} from "@webstudio-is/react-sdk";
import type { Build } from "../schema";
import { addGlobalRules } from "./global-rules";
import { getStyleRules } from "./style-rules";

type Data = {
  assets: Asset[];
  build?: Build;
  tree?: Tree;
};

export const generateCssText = (data: Data) => {
  const assets = new Map<Asset["id"], Asset>(
    data.assets.map((asset) => [asset.id, asset])
  );
  const breakpoints = new Map(data.build?.breakpoints);
  const styles = new Map(data.build?.styles);
  const styleSourceSelections = new Map(data.tree?.styleSourceSelections);

  const engine = createCssEngine({ name: "ssr" });

  addGlobalRules(engine, { assets });

  for (const breakpoint of breakpoints.values()) {
    engine.addMediaRule(breakpoint.id, breakpoint);
  }

  for (const component of getComponentNames()) {
    const meta = getComponentMeta(component);
    const presetStyle = meta?.presetStyle;
    if (presetStyle !== undefined) {
      engine.addStyleRule(`[data-ws-component=${component}]`, {
        style: presetStyle,
      });
    }
  }

  const styleRules = getStyleRules(styles, styleSourceSelections);
  for (const { breakpointId, instanceId, style } of styleRules) {
    engine.addStyleRule(`[${idAttribute}="${instanceId}"]`, {
      breakpoint: breakpointId,
      style,
    });
  }

  return engine.cssText;
};
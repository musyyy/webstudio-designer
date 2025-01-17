import type { Style } from "@webstudio-is/css-data";
import type {
  Breakpoint,
  StyleDecl,
  Styles,
  StyleSource,
  StyleSourceSelections,
} from "@webstudio-is/project-build";

type StyleRule = {
  instanceId: string;
  breakpointId: string;
  style: Style;
};

/**
 * Merge styles from different style sources
 * and group by instance and breakpoint
 */
export const getStyleRules = (
  styles: Styles,
  styleSourceSelections: StyleSourceSelections
) => {
  if (styles === undefined || styleSourceSelections === undefined) {
    return [];
  }
  const stylesByStyleSourceId = new Map<StyleSource["id"], StyleDecl[]>();
  for (const styleDecl of styles.values()) {
    const { styleSourceId } = styleDecl;
    let styleSourceStyles = stylesByStyleSourceId.get(styleSourceId);
    // instance can be undefined when style is from other tree
    if (styleSourceStyles === undefined) {
      styleSourceStyles = [];
      stylesByStyleSourceId.set(styleSourceId, styleSourceStyles);
    }
    styleSourceStyles.push(styleDecl);
  }

  const styleRules: StyleRule[] = [];
  for (const { instanceId, values } of styleSourceSelections.values()) {
    const styleRuleByBreakpointId = new Map<Breakpoint["id"], StyleRule>();

    for (const styleSourceId of values) {
      const styleSourceStyles = stylesByStyleSourceId.get(styleSourceId);
      // instance can be undefined when style is from other tree
      if (styleSourceStyles === undefined) {
        continue;
      }
      for (const { breakpointId, property, value } of styleSourceStyles) {
        let styleRule = styleRuleByBreakpointId.get(breakpointId);
        if (styleRule === undefined) {
          styleRule = {
            instanceId,
            breakpointId,
            style: {},
          };
          styleRuleByBreakpointId.set(breakpointId, styleRule);
        }
        styleRule.style[property] = value;
      }
    }
    styleRules.push(...styleRuleByBreakpointId.values());
  }

  return styleRules;
};

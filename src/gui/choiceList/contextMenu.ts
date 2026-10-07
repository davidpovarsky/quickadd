import type { App } from "obsidian";
import { Menu as ObsidianMenu } from "obsidian";
import { t } from "../../i18n";
import type IChoice from "src/types/choices/IChoice";
import type IMultiChoice from "src/types/choices/IMultiChoice";

export type MoveTarget = { id: string; path: string };

export const MOVE_TO_ROOT_TARGET_ID = "quickadd:move-to-root";

export function isChoiceNested(
  choice: IChoice,
  roots: IChoice[] | undefined,
): boolean {
  const source: IChoice[] = Array.isArray(roots) ? roots : [];
  if (source.some((c) => c.id === choice.id)) return false;

  const walk = (list: IChoice[]): boolean => {
    for (const c of list) {
      if (c.type === "Multi") {
        const children = (c as IMultiChoice).choices ?? [];
        if (children.some((child) => child.id === choice.id)) return true;
        if (walk(children)) return true;
      }
    }
    return false;
  };

  return walk(source);
}

export function computeEligibleMultiTargets(
  moving: IChoice,
  roots: IChoice[] | undefined,
): MoveTarget[] {
  const multiNodes: MoveTarget[] = [];
  const source: IChoice[] = Array.isArray(roots) ? roots : [];

  const walk = (list: IChoice[], prefix: string[] = []) => {
    for (const c of list) {
      const name = c.name ?? "";
      if (c.type === "Multi") {
        const path = [...prefix, name];
        if (!isInvalidTarget(moving, c)) {
          multiNodes.push({ id: c.id, path: path.join(" / ") });
        }
        walk((c as IMultiChoice).choices ?? [], [...prefix, name]);
      }
    }
  };

  walk(source, []);
  return multiNodes;
}

function isInvalidTarget(moving: IChoice, target: IChoice): boolean {
  if (target.type !== "Multi") return true;
  if (moving.id === target.id) return true;
  if (moving.type === "Multi") {
    const ids = new Set<string>();
    const collect = (c: IChoice) => {
      ids.add(c.id);
      if (c.type === "Multi") (c as IMultiChoice).choices?.forEach(collect);
    };
    (moving as IMultiChoice).choices?.forEach(collect);
    if (ids.has(target.id)) return true;
  }
  return false;
}

type MenuActions = {
  onRename: () => void;
  onToggle: () => void;
  onConfigure: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onMove: (targetId: string) => void;
};

function buildChoiceMenu(
  app: App,
  choice: IChoice,
  roots: IChoice[] | undefined,
  actions: MenuActions,
): ObsidianMenu {
  const menu = new ObsidianMenu();

  menu
    .addItem((item) =>
      item
        .setTitle(choice.command ? t("choices.disableCommandPalette") : t("choices.enableCommandPalette"))
        .setIcon("zap")
        .onClick(actions.onToggle),
    )
    .addItem((item) => item.setTitle(t("choices.rename")).setIcon("pencil").onClick(actions.onRename))
    .addItem((item) => item.setTitle(t("choices.configure")).setIcon("settings").onClick(actions.onConfigure))
    .addItem((item) => item.setTitle(t("choices.duplicate")).setIcon("copy").onClick(actions.onDuplicate))
    .addItem((item) => item.setTitle(t("choices.delete")).setIcon("trash-2").onClick(actions.onDelete))
    .addSeparator();

  if (isChoiceNested(choice, roots)) {
    menu.addItem((item) =>
      item
        .setTitle(t("choices.moveToRoot"))
        .setIcon("folder-up")
        .onClick(() => actions.onMove(MOVE_TO_ROOT_TARGET_ID)),
    );
  }

  const targets = computeEligibleMultiTargets(choice, roots);
  if (targets.length === 0) {
    menu.addItem((item) =>
      item.setTitle(t("choices.moveToNoFolders")).setDisabled(true).setIcon("folder"),
    );
  } else {
    targets.forEach((target) =>
      menu.addItem((item) =>
        item
          .setTitle(t("choices.moveToPath", { path: target.path }))
          .setIcon("folder-open")
          .onClick(() => actions.onMove(target.id)),
      ),
    );
  }

  return menu;
}

export function showChoiceContextMenu(
  app: App,
  evt: MouseEvent,
  choice: IChoice,
  roots: IChoice[] | undefined,
  actions: MenuActions,
): void {
  evt.preventDefault();
  buildChoiceMenu(app, choice, roots, actions).showAtMouseEvent(evt);
}

export function showChoiceContextMenuAtElement(
  app: App,
  anchor: HTMLElement,
  choice: IChoice,
  roots: IChoice[] | undefined,
  actions: MenuActions,
): void {
  const rect = anchor.getBoundingClientRect();
  buildChoiceMenu(app, choice, roots, actions).showAtPosition({
    x: rect.left,
    y: rect.bottom,
  });
}

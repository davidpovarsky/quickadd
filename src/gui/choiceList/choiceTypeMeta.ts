import { t } from "../../i18n";
import type { ChoiceType } from "../../types/choices/choiceType";
import type IChoice from "../../types/choices/IChoice";
import { flattenChoices } from "../../utils/choiceUtils";

export interface ChoiceTypeMeta {
	type: ChoiceType;
	/** Short, sentence-case label. */
	label: string;
	/** One-line explanation shown next to the label in the "New choice" menu. */
	description: string;
	/** Obsidian/lucide icon id. */
	iconId: string;
}

/**
 * The three "doer" choice types offered by the "New choice" menu. The fourth
 * type, `Multi`, is a folder/container and is offered as its own "New folder"
 * action rather than as a peer in this list — that separation is the whole point
 * of the redesign, so keep Multi OUT of here.
 */
export const DOER_CHOICE_TYPES: ChoiceTypeMeta[] = [
	{
		type: "Template",
		label: t("choiceTypes.template.label"),
		description: t("choiceTypes.template.description"),
		iconId: "file-text",
	},
	{
		type: "Capture",
		label: t("choiceTypes.capture.label"),
		description: t("choiceTypes.capture.description"),
		iconId: "pencil",
	},
	{
		type: "Macro",
		label: t("choiceTypes.macro.label"),
		description: t("choiceTypes.macro.description"),
		iconId: "terminal",
	},
];

/**
 * Auto-generated default name for a freshly added choice. The add flow never
 * gates on the user typing a name first (and never persists a nameless choice);
 * the name is editable immediately afterward in the builder / via rename.
 */
export function defaultChoiceName(type: ChoiceType): string {
	switch (type) {
		case "Template":
			return t("choiceTypes.default.template");
		case "Capture":
			return t("choiceTypes.default.capture");
		case "Macro":
			return t("choiceTypes.default.macro");
		case "Multi":
			return t("choiceTypes.default.folder");
	}
}

/**
 * Default name for a freshly added choice, disambiguated from existing siblings.
 * Every new choice starts from {@link defaultChoiceName}; when that label is
 * already taken anywhere in the tree, appends " 2", " 3", … so rows stay
 * distinguishable in the list and drag pill (fixes #1318).
 */
export function uniqueDefaultChoiceName(
	type: ChoiceType,
	existing: IChoice[],
): string {
	const base = defaultChoiceName(type);
	const names = new Set(flattenChoices(existing).map((c) => c.name));
	if (!names.has(base)) return base;
	let i = 2;
	while (names.has(`${base} ${i}`)) i++;
	return `${base} ${i}`;
}

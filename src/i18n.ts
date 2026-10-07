type Language = "en" | "he";
type TemplateValue = string | number | boolean | null | undefined;

const en = {
	"commands.run": "Run",
	"commands.runTemplateFromFolder": "New note from template",
	"commands.applyTemplate": "Apply template to active note",
	"commands.reloadDev": "Reload (dev)",
	"commands.testDev": "Test (dev)",

	"settings.groups.choicesAndPackages": "Choices & Packages",
	"settings.groups.choicePicker": "Choice Picker",
	"settings.groups.input": "Input",
	"settings.groups.templates": "Templates & Properties",
	"settings.groups.notifications": "Notifications",
	"settings.groups.globalVariables": "Global Variables",
	"settings.groups.aiAndOnline": "AI & Online",
	"settings.groups.appearance": "Appearance",
	"settings.groups.developer": "Developer",
	"settings.choices.name": "Choices",
	"settings.packages.name": "Packages",
	"settings.packages.desc": "Bundle or import QuickAdd automations as reusable packages.",
	"settings.packages.export": "Export package…",
	"settings.packages.import": "Import package…",
	"settings.searchNestedChoices.name": "Search nested choices",
	"settings.searchNestedChoices.desc": "When searching in the choice picker, also match choices nested inside Multi choices and show their path. Note that nested matches can outrank same-level ones. Disable to search only the open level.",
	"settings.templateFolderLauncherRow.name": "“New note from template” in the launcher",
	"settings.templateFolderLauncherRow.desc": "Add a row to Run QuickAdd that lists templates from your configured template folder, so you can create a note from a template without a dedicated Template choice. Only appears when a template folder is configured; the command palette entry works regardless.",
	"settings.templateFolderLauncherRow.bottom": "Show at the bottom (keeps your top choice first)",
	"settings.templateFolderLauncherRow.top": "Show at the top",
	"settings.templateFolderLauncherRow.off": "Hide",
	"settings.inputPrompt.name": "Use Multi-line Input Prompt",
	"settings.inputPrompt.desc": "Use multi-line input prompt instead of single-line input prompt",
	"settings.persistInputPromptDrafts.name": "Persist Input Prompt Drafts",
	"settings.persistInputPromptDrafts.desc": "Keep drafts when closing input prompts so they can be restored on reopen. Drafts are stored only for this session.",
	"settings.useSelectionAsCaptureValue.name": "Use editor selection as default Capture value",
	"settings.useSelectionAsCaptureValue.desc": "When enabled, Capture uses the current editor selection as {{VALUE}} and may skip the prompt. When disabled, Capture always prompts for {{VALUE}}.",
	"settings.onePageInputEnabled.name": "One-page input for choices (Beta)",
	"settings.onePageInputEnabled.desc": "Experimental. Resolve variables up front and show a single dynamic form before executing Template/Capture choices. See Advanced → One-page Inputs in docs.",
	"settings.dateAliases.name": "Date aliases",
	"settings.dateAliases.desc": "Shortcodes for natural language date parsing. One per line: alias = phrase. Example: tm = tomorrow.",
	"settings.dateAliases.placeholder": "t = today\ntm = tomorrow\nyd = yesterday",
	"settings.dateAliases.reset": "Reset to defaults",
	"settings.templateFolderPaths.name": "Template folder paths",
	"settings.templateFolderPaths.desc": "Folders where templates are stored. Used to suggest template files when configuring QuickAdd. Add as many as you like; leave empty to suggest every template file in the vault.",
	"settings.enableTemplatePropertyTypes.name": "Convert string front matter variables to typed properties (Beta)",
	"settings.enableTemplatePropertyTypes.desc": "List/object values from scripts are always written as proper Obsidian properties (a list becomes a List). This toggle additionally converts string values into typed properties: a comma or bullet-list string becomes a List, \"42\" becomes a Number, \"true\" becomes a Checkbox, etc. Disabled by default; the string conversion is a beta heuristic that may have edge cases.",
	"settings.announceUpdates.name": "Announce Updates",
	"settings.announceUpdates.desc": "Display release notes when a new version is installed. This includes new features, demo videos, and bug fixes.",
	"settings.announceUpdates.all": "Show updates on each new release",
	"settings.announceUpdates.major": "Show updates only on major releases (new features, breaking changes)",
	"settings.announceUpdates.none": "Don't show",
	"settings.showCaptureNotification.name": "Show Capture Notifications",
	"settings.showCaptureNotification.desc": "Display a notification when content is captured successfully to confirm the operation completed.",
	"settings.showInputCancellationNotification.name": "Show Input Cancellation Notifications",
	"settings.showInputCancellationNotification.desc": "Display a notification when an input prompt is cancelled without submitting. Disable this to avoid extra notices when dismissing prompts.",
	"settings.disableOnlineFeatures.name": "Disable AI & Online features",
	"settings.disableOnlineFeatures.desc": "This prevents the plugin from making requests to external providers like OpenAI. You can still use User Scripts to execute arbitrary code, including contacting external providers. However, this setting disables plugin features like the AI Assistant from doing so. You need to disable this setting to use the AI Assistant.",
	"settings.enableUriCallbacks.name": "Allow URI x-callback-url",
	"settings.enableUriCallbacks.desc": "When on, an obsidian://quickadd URI may open a callback URL (x-success / x-error / x-cancel) after a Template or Capture choice finishes — sending the outcome and the affected note's vault path and URL to that callback. While on, a URI that carries x-* callback params is restricted to Template and Capture choices (other choice types are warned and skipped). Off by default because the callback URL is set by whoever creates the obsidian:// link. Only shortcuts: and obsidian: callback URLs are permitted.",
	"settings.enableRibbonIcon.name": "Show icon in sidebar",
	"settings.enableRibbonIcon.desc": "Add QuickAdd icon to the sidebar ribbon. Requires a reload.",
	"settings.developmentInfo.name": "Development Information",
	"settings.developmentInfo.desc": "Git information for developers.",
	"settings.templateFolders.empty": "No folders added yet.",
	"settings.templateFolders.remove": "Remove {folder}",
	"settings.templateFolders.add": "Add",

	"choices.noChoicesYet": "No choices yet",
	"choices.emptyBody": "A choice is an action QuickAdd can run — create a note, capture text, or run a macro. Group them with folders.",
	"choices.filterPlaceholder": "Filter choices (fuzzy)",
	"choices.clearFilter": "Clear filter",
	"choices.clear": "Clear",
	"choices.configureAI": "Configure AI Assistant",
	"choices.duplicated": "Duplicated \"{name}\".",
	"choices.emptyFolderHint": "Empty — add a choice or drag one here.",
	"choices.movedToPosition": "Moved {name} to position {position} of {total}",
	"choices.newChoice": "New choice",
	"choices.newFolder": "New folder",
	"choices.addChoice": "Add choice",
	"choices.addFolder": "Add folder",
	"choices.addChoiceTo": "Add choice to {name}",
	"choices.addFolderTo": "Add folder to {name}",
	"choices.commandPalette": "Command palette",
	"choices.configure": "Configure",
	"choices.configureNamed": "Configure {name}",
	"choices.duplicate": "Duplicate",
	"choices.duplicateNamed": "Duplicate {name}",
	"choices.delete": "Delete",
	"choices.deleteNamed": "Delete {name}",
	"choices.moreOptions": "More options",
	"choices.moreOptionsFor": "More options for {name}",
	"choices.reorder": "Reorder",
	"choices.reorderNamed": "Reorder {name}",
	"choices.toggleNamed": "Toggle {name}",
	"choices.enableCommandPalette": "Enable in Command Palette",
	"choices.disableCommandPalette": "Disable in Command Palette",
	"choices.rename": "Rename",
	"choices.moveToRoot": "Move to: (root)",
	"choices.moveToNoFolders": "Move to: (no folders)",
	"choices.moveToPath": "Move to: {path}",
	"choiceTypes.template.label": "Template",
	"choiceTypes.template.description": "Create a note from a template file.",
	"choiceTypes.capture.label": "Capture",
	"choiceTypes.capture.description": "Add text to a note — append, prepend, or insert.",
	"choiceTypes.macro.label": "Macro",
	"choiceTypes.macro.description": "Run a sequence of commands and scripts.",
	"choiceTypes.default.template": "New template",
	"choiceTypes.default.capture": "New capture",
	"choiceTypes.default.macro": "New macro",
	"choiceTypes.default.folder": "New folder",
} as const;

type TranslationKey = keyof typeof en;

const he: Record<TranslationKey, string> = {
	"commands.run": "הפעל",
	"commands.runTemplateFromFolder": "פתק חדש מתבנית",
	"commands.applyTemplate": "החל תבנית על הפתק הפעיל",
	"commands.reloadDev": "טעינה מחדש (פיתוח)",
	"commands.testDev": "בדיקה (פיתוח)",

	"settings.groups.choicesAndPackages": "בחירות וחבילות",
	"settings.groups.choicePicker": "בורר הבחירות",
	"settings.groups.input": "קלט",
	"settings.groups.templates": "תבניות ומאפיינים",
	"settings.groups.notifications": "התראות",
	"settings.groups.globalVariables": "משתנים גלובליים",
	"settings.groups.aiAndOnline": "AI ואונליין",
	"settings.groups.appearance": "מראה",
	"settings.groups.developer": "מפתח",
	"settings.choices.name": "בחירות",
	"settings.packages.name": "חבילות",
	"settings.packages.desc": "אריזה או ייבוא של אוטומציות QuickAdd כחבילות לשימוש חוזר.",
	"settings.packages.export": "ייצוא חבילה…",
	"settings.packages.import": "ייבוא חבילה…",
	"settings.searchNestedChoices.name": "חיפוש בבחירות מקוננות",
	"settings.searchNestedChoices.desc": "בעת חיפוש בבורר הבחירות, חפש גם בחירות שנמצאות בתוך בחירות Multi והצג את הנתיב שלהן. שים לב שתוצאות מקוננות עשויות להופיע לפני תוצאות באותה רמה. כבה כדי לחפש רק ברמה הפתוחה.",
	"settings.templateFolderLauncherRow.name": "״פתק חדש מתבנית״ במפעיל",
	"settings.templateFolderLauncherRow.desc": "הוסף שורה ל־Run QuickAdd שמציגה תבניות מתיקיית התבניות שהוגדרה, כדי ליצור פתק מתבנית בלי בחירת Template ייעודית. מופיע רק כאשר מוגדרת תיקיית תבניות; הפקודה בפלטת הפקודות עובדת בכל מקרה.",
	"settings.templateFolderLauncherRow.bottom": "הצג בתחתית (שומר את הבחירה העליונה שלך ראשונה)",
	"settings.templateFolderLauncherRow.top": "הצג בחלק העליון",
	"settings.templateFolderLauncherRow.off": "הסתר",
	"settings.inputPrompt.name": "השתמש בחלונית קלט מרובת שורות",
	"settings.inputPrompt.desc": "השתמש בחלונית קלט מרובת שורות במקום חלונית קלט של שורה אחת",
	"settings.persistInputPromptDrafts.name": "שמירת טיוטות של חלוניות קלט",
	"settings.persistInputPromptDrafts.desc": "שמור טיוטות בעת סגירת חלוניות קלט כדי שיהיה אפשר לשחזר אותן בפתיחה מחדש. הטיוטות נשמרות רק למשך ההפעלה הנוכחית.",
	"settings.useSelectionAsCaptureValue.name": "השתמש בבחירת העורך כערך ברירת המחדל של Capture",
	"settings.useSelectionAsCaptureValue.desc": "כאשר האפשרות פעילה, Capture ישתמש בבחירה הנוכחית בעורך בתור {{VALUE}} ועשוי לדלג על השאלה. כאשר היא כבויה, Capture תמיד יבקש ערך עבור {{VALUE}}.",
	"settings.onePageInputEnabled.name": "קלט בעמוד אחד לבחירות (בטא)",
	"settings.onePageInputEnabled.desc": "ניסיוני. פתור משתנים מראש והצג טופס דינמי יחיד לפני הרצת בחירות Template/Capture. ראה Advanced → One-page Inputs בתיעוד.",
	"settings.dateAliases.name": "כינויי תאריכים",
	"settings.dateAliases.desc": "קיצורים לפענוח תאריכים בשפה טבעית. אחד בכל שורה: alias = phrase. לדוגמה: tm = tomorrow.",
	"settings.dateAliases.placeholder": "t = today\ntm = tomorrow\nyd = yesterday",
	"settings.dateAliases.reset": "איפוס לברירות המחדל",
	"settings.templateFolderPaths.name": "נתיבי תיקיות תבניות",
	"settings.templateFolderPaths.desc": "תיקיות שבהן מאוחסנות תבניות. משמשות להצעת קובצי תבנית בעת הגדרת QuickAdd. אפשר להוסיף כמה שרוצים; השאר ריק כדי להציע כל קובץ תבנית בכספת.",
	"settings.enableTemplatePropertyTypes.name": "המרת משתני front matter טקסטואליים למאפיינים מוקלדים (בטא)",
	"settings.enableTemplatePropertyTypes.desc": "ערכי רשימה/אובייקט מסקריפטים תמיד נכתבים כמאפייני Obsidian תקינים (רשימה הופכת ל־List). המתג הזה ממיר בנוסף ערכי טקסט למאפיינים מוקלדים: טקסט עם פסיקים או רשימת תבליטים הופך ל־List, ‏\"42\" הופך ל־Number, ‏\"true\" הופך ל־Checkbox, וכן הלאה. כבוי כברירת מחדל; המרת הטקסט היא היוריסטיקת בטא שעשויה לכלול מקרי קצה.",
	"settings.announceUpdates.name": "הכרזה על עדכונים",
	"settings.announceUpdates.desc": "הצג הערות גרסה כאשר מותקנת גרסה חדשה. כולל תכונות חדשות, סרטוני הדגמה ותיקוני באגים.",
	"settings.announceUpdates.all": "הצג עדכונים בכל גרסה חדשה",
	"settings.announceUpdates.major": "הצג עדכונים רק בגרסאות ראשיות (תכונות חדשות ושינויים שוברים)",
	"settings.announceUpdates.none": "אל תציג",
	"settings.showCaptureNotification.name": "הצג התראות Capture",
	"settings.showCaptureNotification.desc": "הצג התראה כאשר תוכן נלכד בהצלחה כדי לאשר שהפעולה הושלמה.",
	"settings.showInputCancellationNotification.name": "הצג התראות ביטול קלט",
	"settings.showInputCancellationNotification.desc": "הצג התראה כאשר חלונית קלט מבוטלת בלי שליחה. כבה כדי להימנע מהודעות נוספות בעת סגירת חלוניות.",
	"settings.disableOnlineFeatures.name": "כיבוי תכונות AI ואונליין",
	"settings.disableOnlineFeatures.desc": "מונע מהתוסף לבצע בקשות לספקים חיצוניים כמו OpenAI. עדיין אפשר להשתמש ב־User Scripts להרצת קוד שרירותי, כולל פנייה לספקים חיצוניים. עם זאת, ההגדרה הזו מכבה תכונות של התוסף כמו AI Assistant. יש לכבות את ההגדרה הזו כדי להשתמש ב־AI Assistant.",
	"settings.enableUriCallbacks.name": "אפשר URI x-callback-url",
	"settings.enableUriCallbacks.desc": "כאשר פעיל, URI מסוג obsidian://quickadd יכול לפתוח כתובת callback ‏(x-success / x-error / x-cancel) אחרי שבחירת Template או Capture מסתיימת — ולשלוח אליה את התוצאה ואת נתיב הכספת והכתובת של הפתק שהושפע. כאשר פעיל, URI שמכיל פרמטרי x-* מוגבל לבחירות Template ו־Capture (סוגים אחרים יקבלו אזהרה וידולגו). כבוי כברירת מחדל משום שכתובת ה־callback נקבעת על ידי מי שיוצר את הקישור obsidian://. רק כתובות callback מסוג shortcuts: ו־obsidian: מותרות.",
	"settings.enableRibbonIcon.name": "הצג סמל בסרגל הצד",
	"settings.enableRibbonIcon.desc": "הוסף את סמל QuickAdd לרצועת סרגל הצד. דורש טעינה מחדש.",
	"settings.developmentInfo.name": "מידע פיתוח",
	"settings.developmentInfo.desc": "מידע Git למפתחים.",
	"settings.templateFolders.empty": "עדיין לא נוספו תיקיות.",
	"settings.templateFolders.remove": "הסר את {folder}",
	"settings.templateFolders.add": "הוסף",

	"choices.noChoicesYet": "עדיין אין בחירות",
	"choices.emptyBody": "בחירה היא פעולה ש־QuickAdd יכול להריץ — יצירת פתק, לכידת טקסט או הרצת מאקרו. אפשר לקבץ בחירות בתיקיות.",
	"choices.filterPlaceholder": "סינון בחירות (עמום)",
	"choices.clearFilter": "נקה סינון",
	"choices.clear": "נקה",
	"choices.configureAI": "הגדרת עוזר AI",
	"choices.duplicated": "שוכפל \"{name}\".",
	"choices.emptyFolderHint": "ריק — הוסף בחירה או גרור אחת לכאן.",
	"choices.movedToPosition": "{name} הועבר למיקום {position} מתוך {total}",
	"choices.newChoice": "בחירה חדשה",
	"choices.newFolder": "תיקייה חדשה",
	"choices.addChoice": "הוסף בחירה",
	"choices.addFolder": "הוסף תיקייה",
	"choices.addChoiceTo": "הוסף בחירה אל {name}",
	"choices.addFolderTo": "הוסף תיקייה אל {name}",
	"choices.commandPalette": "פלטת הפקודות",
	"choices.configure": "הגדר",
	"choices.configureNamed": "הגדר את {name}",
	"choices.duplicate": "שכפל",
	"choices.duplicateNamed": "שכפל את {name}",
	"choices.delete": "מחק",
	"choices.deleteNamed": "מחק את {name}",
	"choices.moreOptions": "אפשרויות נוספות",
	"choices.moreOptionsFor": "אפשרויות נוספות עבור {name}",
	"choices.reorder": "סדר מחדש",
	"choices.reorderNamed": "סדר מחדש את {name}",
	"choices.toggleNamed": "פתח/סגור את {name}",
	"choices.enableCommandPalette": "הפעל בפלטת הפקודות",
	"choices.disableCommandPalette": "כבה בפלטת הפקודות",
	"choices.rename": "שנה שם",
	"choices.moveToRoot": "העבר אל: (שורש)",
	"choices.moveToNoFolders": "העבר אל: (אין תיקיות)",
	"choices.moveToPath": "העבר אל: {path}",
	"choiceTypes.template.label": "תבנית",
	"choiceTypes.template.description": "יצירת פתק מקובץ תבנית.",
	"choiceTypes.capture.label": "לכידה",
	"choiceTypes.capture.description": "הוספת טקסט לפתק — בסוף, בהתחלה או באמצע.",
	"choiceTypes.macro.label": "מאקרו",
	"choiceTypes.macro.description": "הרצת רצף פקודות וסקריפטים.",
	"choiceTypes.default.template": "תבנית חדשה",
	"choiceTypes.default.capture": "לכידה חדשה",
	"choiceTypes.default.macro": "מאקרו חדש",
	"choiceTypes.default.folder": "תיקייה חדשה",
};

const translations: Record<Language, Record<TranslationKey, string>> = { en, he };

function getLocaleCandidates(): string[] {
	const candidates: string[] = [];
	const read = (getter: () => unknown): void => {
		try {
			const value = getter();
			if (typeof value === "string" && value.length > 0) candidates.push(value);
			if (Array.isArray(value)) {
				for (const item of value) {
					if (typeof item === "string" && item.length > 0) candidates.push(item);
				}
			}
		} catch {
			// Locale detection must never break plugin startup or settings rendering.
		}
	};

	read(() => (globalThis as { moment?: { locale?: () => string } }).moment?.locale?.());
	read(() => document?.documentElement?.lang);
	read(() => navigator?.language);
	read(() => navigator?.languages);

	return candidates;
}

export function getQuickAddLanguage(): Language {
	return getLocaleCandidates().some((locale) => {
		const normalized = locale.toLowerCase().replace("_", "-");
		return normalized === "he" || normalized.startsWith("he-") || normalized === "iw" || normalized.startsWith("iw-");
	})
		? "he"
		: "en";
}

export function isQuickAddRtl(): boolean {
	return getQuickAddLanguage() === "he";
}

export function quickAddTextDirection(): "ltr" | "rtl" {
	return isQuickAddRtl() ? "rtl" : "ltr";
}

export function t(key: TranslationKey, values: Record<string, TemplateValue> = {}): string {
	const message = translations[getQuickAddLanguage()][key] ?? en[key] ?? key;
	return message.replace(/\{(\w+)\}/g, (match, name) => {
		const value = values[name];
		return value === undefined || value === null ? match : String(value);
	});
}

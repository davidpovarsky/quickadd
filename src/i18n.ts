type Language = "en" | "he";

type CommandLabelKey =
	| "commands.run"
	| "commands.runTemplateFromFolder"
	| "commands.applyTemplate"
	| "commands.reloadDev"
	| "commands.testDev";

const en: Record<CommandLabelKey, string> = {
	"commands.run": "Run",
	"commands.runTemplateFromFolder": "New note from template",
	"commands.applyTemplate": "Apply template to active note",
	"commands.reloadDev": "Reload (dev)",
	"commands.testDev": "Test (dev)",
};

const he: Record<CommandLabelKey, string> = {
	"commands.run": "הפעל",
	"commands.runTemplateFromFolder": "פתק חדש מתבנית",
	"commands.applyTemplate": "החל תבנית על הפתק הפעיל",
	"commands.reloadDev": "טעינה מחדש (פיתוח)",
	"commands.testDev": "בדיקה (פיתוח)",
};

const translations: Record<Language, Record<CommandLabelKey, string>> = { en, he };

function hasHebrewLocale(locale: string): boolean {
	const normalized = locale.toLowerCase().replace("_", "-");
	return normalized === "he" || normalized.startsWith("he-") || normalized === "iw" || normalized.startsWith("iw-");
}

export function getQuickAddLanguage(): Language {
	try {
		const languages = typeof navigator === "undefined"
			? []
			: [navigator.language, ...(navigator.languages ?? [])].filter(Boolean);
		return languages.some(hasHebrewLocale) ? "he" : "en";
	} catch {
		return "en";
	}
}

export function t(key: CommandLabelKey): string {
	return translations[getQuickAddLanguage()][key] ?? en[key];
}

export type ConfigDomain = "users" | "schema" | "credentials" | "app-config";

export enum ConfigAdaptorTypes {
  JsonFile = "json-file",
  Database = "database",
  Memory = "memory",
  Redis = "redis",
}

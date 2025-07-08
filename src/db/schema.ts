import {
  mysqlTable,
  serial,
  varchar,
  text,
  date,
  int,
} from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

export const empresas = mysqlTable('empresas', {
  id: int('id').autoincrement().primaryKey(),
  razaoSocial: varchar('razao_social', { length: 255 }).notNull(),
  cnpj: varchar('cnpj', { length: 18 }).notNull(),
  cep: varchar('cep', { length: 9 }).notNull(),
  cidade: varchar('cidade', { length: 100 }).notNull(),
  estado: varchar('estado', { length: 2 }).notNull(),
  bairro: varchar('bairro', { length: 100 }).notNull(),
  complemento: text('complemento'),
});

export const licencas = mysqlTable('licencas', {
  id: serial('id').primaryKey(),
  numero: varchar('numero', { length: 100 }).notNull(),
  orgaoAmbiental: varchar('orgao_ambiental', { length: 255 }).notNull(),
  emissao: date('emissao').notNull(),
  validade: date('validade').notNull(),
  empresaId: int('empresa_id').notNull().references(() => empresas.id, {
    onDelete: 'cascade',
  }),
});

export const empresasRelations = relations(empresas, ({ many }) => ({
  licencas: many(licencas),
}));

export const licencasRelations = relations(licencas, ({ one }) => ({
  empresa: one(empresas, {
    fields: [licencas.empresaId],
    references: [empresas.id],
  }),
}));

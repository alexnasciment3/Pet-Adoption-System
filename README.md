# Sistema de Adoção - API REST com Node.js

## 🔧Regras do Projeto

Este projeto tem como objetivo o desenvolvimento de uma API para um sistema de adoção de animais. O projeto deve ser implementado utilizando as seguintes tecnologias obrigatórias:

- Node.js
- Express.js
- Sequelize
- SQLite (ou outro banco relacional com Sequelize)

Está liberado o uso de APIs externas, desde que estejam documentadas no arquivo README no momento da entrega.
Todas as tabelas do banco de dados devem conter campos de “**createdAt“** e “**updatedAt”** de identificação, timestamps e validações coerentes.

# 📌 Funcionalidades e Endpoints

## 1\. Cadastro de Animal

**POST /animais**

**Descrição**: Cadastra um novo animal disponível para adoção, salvar o **buffer** da imagem no campo foto

**201 Created** – Animal cadastrado com sucesso:

```
{
"id": "uuid",
"nome": "string",
"especie": "string",
"porte": "string",
"castrado": true,
"vacinado": true,
"descricao": "string",
"foto": "Buffer"
}
```

**400 Bad Request** – Campos obrigatórios ausentes ou inválidos:

```
{"erro": "Todos os campos obrigatórios devem ser preenchidos corretamente."}
```

**500 Internal Server Error** – Erro ao cadastrar o animal:

```
{"erro": "Erro interno ao cadastrar o animal."}
```

## 2\. Cadastro de Tutor

**POST /usuario**

**Descrição**: Cadastra um novo usuario com seus dados. O questionário pode ou não ser enviado junto ao cadastro do usuário.

**201 Created** – Tutor cadastrado com sucesso:

```
{
"id": "uuid",
"nome_completo": "string",
"senha":"string",
"email": "string",
"cidade": "string",
"estado": "string",
“idade”: “number”,
“telefone”: ”number”,
“instagram”: ”string”,
“facebook”: ”string”
}
```

**400 Bad Request** – Dados obrigatórios ausentes ou questionário incompleto:

```
{"erro": "Todos os campos obrigatórios devem ser preenchidos corretamente."}
```

**400 Bad Request** – Insira um novo email:

```
{"erro": "Email preenchido já está sendo utilizado."}
```

**500 Internal Server Error** – Erro ao cadastrar o tutor:

```
{"erro": "Erro interno ao cadastrar o tutor."}
```

**POST /questionario**

**Descrição**: Cadastra o questionário que todo tutor precisa ter respondido para para poder adotar. Para cadastrar o questionário um usuário deve existir no sistema.

**201 Created** – Questionário enviado:

```
{"empregado": "boolean",
"quantos_animais_possui": "number",
"motivos_para_adotar": "string",
"quem_vai_sustentar_o_animal": "string",
"numero_adultos_na_casa": "number",
"numero_criancas_na_casa": "number",
"idades_criancas": \["string"\],
"residencia_tipo": "string", // "própria" ou "alugada,
"proprietario_permite_animais": "boolean",
"todos_de_acordo_com_adocao": "boolean","responsavel_pelo_animal": "string",
"responsavel_concorda_com_adocao": "boolean",
"ha_alergico_ou_pessoas_que_nao_gostam": "boolean",
"gasto_mensal_estimado": "number",
"valor_disponivel_no_orcamento": "boolean",
"tipo_alimentacao": "string",
"local_que_o_animal_vai_ficar": "string", // "quintal","área interna", "canil", "dentro de casa"
"forma_de_permanencia": "string", // "solto 24h", "preso", "preso de dia e solto à noite", "preso parte do dia"
"forma_de_confinamento": "string", // "corrente", "canil", "área fechada"
"tera_brinquedos": "boolean","tera_abrigo": "boolean",
"tera_passeios_acompanhado": "boolean",
"tera_passeios_sozinho": "boolean",
"companhia_outro_animal": "boolean",
"companhia_humana_24h": "boolean",
"companhia_humana_parcial": "boolean",
"sem_companhia_humana": "boolean",
"sem_companhia_animal": "boolean",
"o_que_faz_em_viagem": "string",
"o_que_faz_se_fugir": "string",
"o_que_faz_se_nao_puder_criar": "string","animais_que_ja_criou": "string",
"destino_animais_anteriores": "string",
"costuma_esterilizar": "boolean",
"costuma_vacinar": "boolean",
"costuma_vermifugar": "boolean",
"veterinario_usual": "string","forma_de_educar": "string",
"envia_fotos_e_videos_do_local": "boolean",
"aceita_visitas_e_fotos_do_animal": "boolean",
"topa_entrar_grupo_adotantes": "boolean",
"concorda_com_taxa_adocao": "boolean",
"data_disponivel_para_buscar_animal": "string"
}
```

**400 Bad Request** – Dados obrigatórios ausentes ou questionário incompleto:

```
{"erro": "Todos os campos obrigatórios devem ser preenchidos corretamente."}
```

## 3\. Visualização de Animais para Adoção

**GET /animais**

Descrição: Lista os animais disponíveis para adoção com suporte a filtros (espécie, porte, castrado etc.).
Ordena por padrão do mais antigo para o mais recente.

**201 Created**

```
{

"data": [
{
"id": "uuid",
"nome": "string",
"especie": "string",
"porte": "string",
"castrado": true,
"vacinado": true,
"descricao": "string",
"imagem": "Buffer", // armazenado como blob
"created_at": "YYYY-MM-DDTHH:MM:SSZ"
}
// ...
],
"total": "number"
}
```

**500 Internal Server Error**

```
{
"erro": "Erro ao buscar animais"
}
```

## 4\. Pedido de Adoção

**POST /adocoes**

**Descrição:** Cria um novo pedido de adoção. Um tutor pode ter múltiplos pedidos em análise. Os pedidos são organizados por ordem de chegada para cada pet. Ao deletar um pedido, a fila deve ser atualizada e para usuário solicitante é obrigatório ter o formulário preenchido.

**201 Created** – Pedido criado com sucesso:

```
{
"id": "uuid",
"tutor_id": "uuid",
"animal_id": "uuid",
"status": "em_analise",
"posicao_fila": 1,
"criado_em": "YYYY-MM-DDTHH:MM:SSZ"
}
```

**400 Bad Request** – Quando o tutor não pode fazer o pedido:

```
{
"erro": "O tutor ainda não respondeu o questionário obrigatório"
}
```

**404 Not Found** – Tutor ou animal não encontrados:

```
{
"erro": "Tutor ou animal não encontrado"
}
```

**409 Conflict** – Já existe pedido ativo para este tutor e animal:

```
{
"erro": "Este tutor já tem um pedido de adoção para este animal"
}
```

**500 Internal Server Error** – Erro interno no servidor:

```
{
"erro": "Erro ao registrar o pedido de adoção"
}
```

## 5\. Atualização de Dados do Tutor

**PATCH /tutores/:id**

**Descrição:** Permite ao tutor atualizar seus dados e/ou completar o questionário obrigatório.

**200 OK** – Dados atualizados com sucesso:

```
{
"id": "uuid",
"nome_completo": "string",
"email": "string",
"cidade": "string",
"estado": "string",
"questionario": { /\* objeto completo ou atualizado \*/ }
}
```

**400 Bad Request** – Nenhum campo enviado para atualização:

```
{
"erro": "Pelo menos um campo deve ser enviado para atualização"
}
```

**404 Not Found** – Tutor não encontrado:

```
{
"erro": "Tutor não encontrado"
}
```

**500 Internal Server Error** – Erro interno:

```
{
"erro": "Erro ao atualizar os dados do tutor"
}
```

## 6\. Visualização de Animais Cadastrados (Admin)

**GET /admin/animais**

**Descrição:** Permite ao administrador visualizar todos os animais com filtros avançados para permitir visualizar animais e seus pedidos de adoção. Este endpoint deve ser protegido por autorização. Apenas administradores devem ter acesso a ele.

200 OK

```
{
"data": [
{
"id": "uuid",
"nome": "string",
"especie": "string",
"porte": "string",
"castrado": true,
"vacinado": true,
"adotado": false,
"descricao": "string",
"imagem": "Buffer", // armazenado como blob
"created_at": "YYYY-MM-DDTHH:MM:SSZ"
}
 ...
],

"total": "number"

}
```

**500 Internal Server Error**

```
{
"erro": "Erro ao buscar animais"
}
```

## 7\. Atualização de Animais (Admin)

**PATCH /admin/animais/:id**

**Descrição:** Atualiza status como castrado, vacinado, adotado, etc. Este endpoint deve ser protegido por autorização.

200 OK

```
{
"id": "uuid",
"nome": "string",
"castrado": true,
"vacinado": true,
"adotado": false,
"descricao": "string",
"updated_at": "YYYY-MM-DDTHH:MM:SSZ"
}
```

**400 Bad Request** – Nenhum campo fornecido:

```
{
"erro": "Nenhum campo foi fornecido para atualização"
}
```

**404 Not Found** – Animal não encontrado:

```
{
"erro": "Animal não encontrado"
}
```

**500 Internal Server Error** – Erro interno no servidor:

```
{
"erro": "Erro ao atualizar o animal"
}
```

## 8\. Detalhes dos Usuários

**GET /tutores/:id**

**Descrição:** Retorna os dados e o questionário preenchido de um tutor.

200 OSK

```
{
"id": "uuid",
"nome_completo": "string",
"rg": "string",
"endereco": "string",
"bairro": "string",
"cidade": "string",
"estado": "string",
"celular": "string",
"telefone": "string",
"email": "string",
"instagram": "string",
"facebook": "string",
"questionario": {
   "empregado": true,
   "quantos_animais_possui": 2,
   "motivos_para_adotar": "string",
   "quem_vai_sustentar_o_animal": "string",
   "numero_adultos_na_casa": 2,
   "numero_criancas_na_casa": 1,
   "idades_criancas": \["5"\],
   "residencia_tipo": "própria",
   "proprietario_permite_animais": true,
   "todos_de_acordo_com_adocao": true,
   "responsavel_pelo_animal": "string",
   "responsavel_concorda_com_adocao": true,
   "ha_alergico_ou_pessoas_que_nao_gostam": false,
   "gasto_mensal_estimado": 300,
   "valor_disponivel_no_orcamento": true,
   "tipo_alimentacao": "rações premium",
   "local_que_o_animal_vai_ficar": "quintal",
   "forma_de_permanencia": "solto 24h",
   "forma_de_confinamento": "nenhum",
   "tera_brinquedos": true,
   "tera_abrigo": true,
   "tera_passeios_acompanhado": true,
   "tera_passeios_sozinho": false,
   "companhia_outro_animal": true,
   "companhia_humana_24h": true,
   "companhia_humana_parcial": false,
   "sem_companhia_humana": false,
   "sem_companhia_animal": false,
   "o_que_faz_em_viagem": "deixa com parente",
   "o_que_faz_se_fugir": "procura imediatamente",
   "o_que_faz_se_nao_puder_criar": "procura nova família",
   "animais_que_ja_criou": "2 cães, 1 gato",
   "destino_animais_anteriores": "todos faleceram de velhice",
   "costuma_esterilizar": true,
   "costuma_vacinar": true,
   "costuma_vermifugar": true,
   "veterinario_usual": "Clínica PetVida",
   "forma_de_educar": "reforço positivo",
   "envia_fotos_e_videos_do_local": true,
   "aceita_visitas_e_fotos_do_animal": true,
   "topa_entrar_grupo_adotantes": true,
   "concorda_com_taxa_adocao": true,
   "data_disponivel_para_buscar_animal": "2024-12-20"
   }
}
```

**404 Not Found** – Tutor não encontrado:

```
{
"erro": "Tutor não encontrado"
}
```

**500 Internal Server Error** – Erro interno:

```
{
"erro": "Erro ao buscar dados do tutor"
}
```

## 9\. Deletar Perfil de Animal (Admin)

**DELETE /admin/animais/:id**

**Descrição:** Remove um animal da base de dados. Este endpoint deve ser protegido por autorização.

**204 No Content** – Animal removido com sucesso:

**404 Not Found** – Animal não encontrado:

```
{
"erro": "Animal não encontrado"
}
```

**403 Forbidden** – Usuário sem permissão:

```
{
"erro": "Acesso não autorizado"
}
```

**500 Internal Server Error** – Erro ao remover:

```
{
"erro": "Erro ao remover animal"
}
```

## 10\. Busca um animal(Admin)

GET/animais/:id

**Descrição:** Busca um animal por id cadastrado, retorna todas as informações do animal com lista de de pedidos ordenada por ordem de mais antigo para o mais recente. Este endpoint deve ser protegido por autorização.

**Parâmetro de URL:**

id (UUID) — Identificador único do animal que será consultado.

**Resposta de Sucesso:**

 **200 OK**

```
{
"id": "uuid",
"nome": "string",
"especie": "string",
"porte": "string",
"castrado": true,
"vacinado": true,
"adotado": false,
"descricao": "string",
"foto": "blob",
"pedidos": ["id", "id" ,"id"]
}
```

**Resposta de Erro:**

**404 Not Found**

```
{
"erro": "Animal não encontrado"
}
```

## 11\. Login

**Descrição:** Realisar a validação do email e senha registrados pelo usuário

**POST /autenticacao**

```
{
"email": "seu-email@dominio.com",
"senha": "sua-senha-secreta"
}
```

200 OK – Login bem-sucedido:

401 Unauthorized – Credenciais inválidas:

```
{
"erro": "Email ou senha inválidos."
}
```

500 Internal Server Error – Erro interno no servidor:

```
{
"erro": "Erro interno ao tentar fazer o login."
}
```

## 12\. Apoie a ONG

**POST /doacoes**

**Descrição:** Registra uma doação recebida com nome, valor e data.

```
Body: {
"nome": "Joana Silva",
"email": "<joana@email.com>",
"valor": 100,
"mensagem": "Obrigada pelo trabalho maravilhoso!"
}
```

201 Created

```
{
"doacao_id": "uuid",
"nome": "Joana Silva",
"valor": 50,
"mensagem": "Obrigada pelo trabalho maravilhoso!",
"linkPix":"00020126580014BR.GOV.BCB.PIX0136chavepix-ficticia@exemplo.com5204000053039865405100.005802BR5920Nome Exemplo Fictício6009Sao Paulo62070503***6304ABCD",
"qrcode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..." // QR Code gerado
}
```

**400 Bad Request** – Valor ausente ou inválido:

```
{
"erro": "Valor da doação é obrigatório e deve ser um número positivo"
}
```

**500 Internal Server Error** – Erro ao registrar a doação:

```
{
"erro": "Erro ao processar a doação"
}
```

## **OBSERVAÇÕES IMPORTANTES**:

* Todas as tebelas devem ter as colunas `createdAt` e `updatedAt`.
* Ao criar o Banco de Dados deve ser criada uma `seed` para inserir os usuários adminstradores no sistema.
* Deve ser utilizado criptografia para salvar as senhas no banco de dados, utilizando a lib:`https://www.npmjs.com/package/encryptjs`.
* A entrega deve ser feita até do final do dia 06/out(Turma de quarta-feira) e 08/out(Turma de segunda-feira), na entrega deve conter o link do repositório criado de maneira **publica**.
* Deve contem no readme da entrega; o nome dos integrates do grupo e a turma.
* O link deve ser enviado para os emails; tomas.verwiebe@venturus.org.br, ygor.pereira@venturus.org.br, alexsander.nascimento@venturus.org.br, maressa.ramalho@venturus.org.br, o assunto do email de ver ´Entrega do projeto Bento´, conteudo deve ter nome do grupo e integrantes e o link do repositório.

## Rotas da API

| POST /animais

| GET /animais

| POST /tutores

| PATCH /tutores/:id

| GET /tutores/:id

| POST /questionário

| POST /adocoes

| GET /admin/animais

| PATCH /admin/animais/:id

| DELETE /admin/animais/:id

| GET /animais/:id

| POST /login

| POST /doacoes

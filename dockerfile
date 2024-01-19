FROM node:17
WORKDIR /app
COPY package*.json ./

RUN npm install
RUN npm install db-migrate-mysql
COPY . .

# This is our secret sauce
RUN git clone https://github.com/vishnubob/wait-for-it.git
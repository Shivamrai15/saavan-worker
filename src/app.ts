import { logger } from 'hono/logger';
import { OpenAPIHono } from '@hono/zod-openapi';
import type { HTTPException } from 'hono/http-exception';
import { prettyJSON } from 'hono/pretty-json';
import type { Routes } from '../common/types';


export class App {
    private app: OpenAPIHono

    constructor(routes: Routes[]) {
        this.app = new OpenAPIHono()

        this.initializeGlobalMiddlewares()
        this.initializeRoutes(routes)
        this.initializeSwaggerUI()
        this.initializeRouteFallback()
        this.initializeErrorHandler()
    }

    private initializeRoutes(routes: Routes[]) {
        routes.forEach((route) => {
        route.initRoutes()
        this.app.route('/api', route.controller)
        });
    }

    private initializeGlobalMiddlewares() {
        this.app.use(logger())
        this.app.use(prettyJSON())
    }

    private initializeSwaggerUI() {
        this.app.doc31('/docs', (c) => {
        const { protocol: urlProtocol, hostname, port } = new URL(c.req.url)
        const protocol = c.req.header('x-forwarded-proto') ? `${c.req.header('x-forwarded-proto')}:` : urlProtocol

        return {
            openapi: '3.1.0',

            info: {
            version: '1.0.0',
            title: 'JioSaavan API',
            description: `A lightweight and easy-to-use Cloudflare worker built with Hono.js🔥 lets developers get data directly from JioSaavn without having to use web scraping.`
            },
            servers: [{ url: `${protocol}//${hostname}${port ? `:${port}` : ''}`, description: 'Current environment' }]
        }
        });
    }


    private initializeRouteFallback() {
        this.app.notFound((ctx) => {
            return ctx.json({ success: false, message: 'route not found' }, 404)
        })
    }


    private initializeErrorHandler() {
        this.app.onError((err, ctx) => {
            const error = err as HTTPException
            return ctx.json({ success: false, message: error.message }, error.status || 500)
        });
    }


    public getApp() {
        return this.app
    }
}
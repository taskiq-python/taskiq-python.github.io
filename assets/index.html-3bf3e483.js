import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as n,a}from"./app-d206f8f9.js";const i={},r=a('<h1 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h1><h2 id="what-is-taskiq" tabindex="-1"><a class="header-anchor" href="#what-is-taskiq" aria-hidden="true">#</a> What is taskiq</h2><p>Taskiq is a library that helps you send and process python functions in a distributed manner. For example, you have many heavy to calculate functions you want to execute on another server. You can implement interservice communication by yourself, or you can use Taskiq to make the job done easily.</p><p>The core library doesn&#39;t have much functionality. It provides two built-in brokers, CLI, basic functionality for creating distributed tasks, and abstractions to extend the taskiq. The main idea of taskiq is to make it modular and easy to extend. We have libraries for many possible use cases, but if you lack something, you can adopt taskiq to fit your needs.</p><h2 id="why-not-use-existing-libraries" tabindex="-1"><a class="header-anchor" href="#why-not-use-existing-libraries" aria-hidden="true">#</a> Why not use existing libraries?</h2><p>We created this project because we couldn&#39;t find any project that can execute and send async functions using distributed queues like RabbitMQ.</p><p>You might have seen projects built on top of asyncio that solve a similar problem, but here&#39;s a comparison table of the taskiq and other projects.</p><table><thead><tr><th style="text-align:right;">Feature name</th><th style="text-align:center;">Taskiq</th><th style="text-align:center;">Arq</th><th style="text-align:center;">AioTasks</th></tr></thead><tbody><tr><td style="text-align:right;">Actively maintained</td><td style="text-align:center;">✅</td><td style="text-align:center;">✅</td><td style="text-align:center;">❌</td></tr><tr><td style="text-align:right;">Multiple broker backends</td><td style="text-align:center;">✅</td><td style="text-align:center;">❌</td><td style="text-align:center;">✅</td></tr><tr><td style="text-align:right;">Multiple result backends</td><td style="text-align:center;">✅</td><td style="text-align:center;">❌</td><td style="text-align:center;">❌</td></tr><tr><td style="text-align:right;">Have a rich documentation</td><td style="text-align:center;">✅</td><td style="text-align:center;">❌</td><td style="text-align:center;">❌</td></tr><tr><td style="text-align:right;">Startup &amp; Shutdown events</td><td style="text-align:center;">✅</td><td style="text-align:center;">✅</td><td style="text-align:center;">❌</td></tr><tr><td style="text-align:right;">Have ability to abort tasks</td><td style="text-align:center;">❌</td><td style="text-align:center;">✅</td><td style="text-align:center;">❌</td></tr><tr><td style="text-align:right;">Custom serializers</td><td style="text-align:center;">✅</td><td style="text-align:center;">✅</td><td style="text-align:center;">❌</td></tr><tr><td style="text-align:right;">Dependency injection</td><td style="text-align:center;">✅</td><td style="text-align:center;">❌</td><td style="text-align:center;">❌</td></tr><tr><td style="text-align:right;">Task pipelines</td><td style="text-align:center;">✅</td><td style="text-align:center;">✅</td><td style="text-align:center;">❌</td></tr><tr><td style="text-align:right;">Task schedules</td><td style="text-align:center;">✅</td><td style="text-align:center;">✅</td><td style="text-align:center;">❌</td></tr><tr><td style="text-align:right;">Global middlewares</td><td style="text-align:center;">✅</td><td style="text-align:center;">❌</td><td style="text-align:center;">❌</td></tr></tbody></table><p>If you have a fully synchronous project, consider using celery or dramatiq instead.</p>',9),s=[r];function d(l,c){return e(),n("div",null,s)}const h=t(i,[["render",d],["__file","index.html.vue"]]);export{h as default};

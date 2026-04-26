# AI Travel Agent

This project implements an intelligent travel planning agent powered by LangChain. The agent can autonomously search the web, scrape websites, and generate comprehensive travel reports based on user input. It can be accessed via a user-friendly web interface built with Streamlit or as a REST API endpoint.

This project was adapted and enhanced from the [Langchain Research Agent](https://github.com/MikeBorman1/LangchainResearchAgent) template.

**My Role:** Project Leader, Idea Provider, Implementation Method Provider, Prompt Engineer

---

## Project Overview

The AI Travel Agent is designed to assist users in planning their trips. Given a user's research goal (e.g., "Plan a 5-day cultural trip to Kyoto for 2 people with a budget of $2000"), the agent will:

1.  **Search the Web**: Use the Serper API to find relevant travel guides, articles, and official sites.
2.  **Scrape Websites**: Use the Browserless API to extract detailed information from specific URLs.
3.  **Reason and Iterate**: Use the LangChain framework to decide if more information is needed and refine its search.
4.  **Generate a Structured Report**: Produce a comprehensive report that includes an introduction, accommodation recommendations, a daily itinerary, budget estimation, and references.

The agent maintains conversation memory and can handle incomplete user requests by making reasonable estimations.

---

## My Contributions

As the project leader, I was responsible for the entire project lifecycle, from ideation to deployment.

### 1. System Design & Architecture
- **Ideation and Leadership**: Proposed the concept of creating a specialized travel agent built on a general research framework.
- **Methodology Provider**: Designed the core workflow and integration strategy for the LangChain framework, the two key external tools (Serper & Browserless), and the front-end interface.
- **Implementation Plan**: Led my team to adapt an open-source research agent repository to meet our specific project goals for a travel agent coursework.

### 2. Prompt Engineering (Key Adaptation Work)
The primary adaptation work involved re-engineering the agent's core instructions (system prompt) to transform it from a general researcher into a travel expert.
- **Original Prompt**: Instructed the agent to act as a "world class researcher" to answer questions.
- **My Adapted Prompt**: Rewrote the system message to give the agent a new persona: "You are an excellent travel agency receptionist, a professional with rich experience in tourism management, travel planning and travel suggestions."【*Referenced from `travel_agent.py`*】
- **Explicit Output Format**: Added specific instructions to the prompt, dictating the final report's structure (Introduction, Overview, Daily Itinerary, Local Information, Budget Estimation, Summary) to ensure consistent, high-quality output. This structured output is much more valuable for a portfolio than raw research data.

### 3. Front-End Integration & Deployment
- **Streamlit Web App (Main Deployment)** : Integrated the LangChain agent into a fully functional Streamlit web application, providing a clean and free front-end interface for the project to function and be presented.【*Referenced from `main.py`*】
- **Alternative API Hosting**: Also developed a Flask API endpoint to showcase a back-end deployment capability.

### 4. Tool Integration
- Integrated the agent with a **Google Search tool** (via the Serper API) for initial information gathering.【*Referenced from `main.py`*】
- Integrated a **Web Scraping tool** (via the Browserless API) to extract and process content from specific URLs. The scraping logic also includes a content summarization feature for long texts.【*Referenced from `main.py`*】

### 5. Memory Management
- Implemented `ConversationSummaryBufferMemory` which keeps a buffer of recent interactions and compiles older interactions into a summary. This is crucial for the agent to maintain context over long research tasks.【*Referenced from `main.py`*】

---

## Technologies Used (My Level)

- **LangChain**: For building the LLM application framework.
- **OpenAI GPT-3.5-Turbo**: As the core large language model.
- **Serper API**: For performing real-time Google searches.
- **Browserless API**: For scraping and extracting content from websites.
- **Streamlit**: For creating the primary web interface.
- **Flask**: For creating a secondary API endpoint.
- **Python**: The primary programming language.

---

## Code Highlights (Key Contributions)

### 1. The Travel Agent's "Persona" (System Prompt)
This is the most significant part of my contribution that distinguishes this project from a standard research template.
```python
system_message = SystemMessage(
    content="""You are an excellent travel agency receptionist, a professional with rich experience in tourism management, travel planning and travel suggestions. You can conduct detailed research on the internet and make fact-based travel plans based on the customer's needs (travel location, date, budgeted number of people) Recommendation report. Even if the information provided by the customer is incomplete, you should still estimate the customer's expectations and make recommendations. Also, you will always give the recommendations based on the best and latest information to customers.; 
            you do not make things up, you will try as hard as possible to gather facts & data to back up the report
            if the information provided by the customer is incomplete, you should still estimate the customer's expectations and make recommendations

            
            Please make sure you complete the objective above with the following rules:
            1/ You should do enough research to gather as much information as possible about the objective
            2/ ... (Output structure rules) ...
            6/ The report you write should include an introduction, overview, text (recommended accommodation, daily itinerary, local things to note), budget (the overall itinerary budget is shown in US dollars), and summary
            7/ In the final output, You should include all reference data & original links to back up your report"""

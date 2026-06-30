import type { BlogPost } from "@/types";

export const blogs: BlogPost[] = [
  {
    "slug": "building-a-4-modality-deepfake-detection-engine",
    "category": "Deep Learning",
    "date": "Jun 15, 2025",
    "title": "Building a 4-Modality Deepfake Detection Engine",
    "excerpt": "How I built Veritas Neural — a deepfake detection system combining face, voice, video, and text analysis using PyTorch and EfficientNet.",
    "cover": "/images/cms/xmKml0E7v2iBI4zbbj0yVccaQwg.jpeg",
    "pinned": true,
    "sections": [
      {
        "heading": "Why Deepfake Detection Needs Multiple Modalities",
        "paragraphs": [
          "Single-modality deepfake detectors are increasingly easy to fool. A face-swap detector might catch visual artifacts, but miss a cloned voice. A text classifier might flag AI-generated captions, but ignore manipulated video frames entirely.",
          "Veritas Neural was built to address this gap — a unified system that analyzes face, voice, video, and text simultaneously, cross-referencing signals across modalities to catch sophisticated fakes that single-channel detectors miss."
        ],
        "images": [
          "/images/cms/9HduiIXX5eSq1WREpvO4qCnKM.jpeg"
        ]
      },
      {
        "heading": "Architecture: EfficientNet Backbone + Custom Heads",
        "paragraphs": [
          "The system uses EfficientNet-B4 as the shared visual backbone for face and video analysis, with custom classification heads for each modality. Voice analysis runs through a separate mel-spectrogram pipeline, and text detection uses transformer-based embeddings.",
          "Each modality produces an independent confidence score. A fusion layer combines these scores with learned attention weights, giving the system the ability to weigh modalities differently depending on input quality."
        ],
        "images": [
          "/images/cms/wOCTh6BhMTLrGPZ7C8doO3XdY.jpeg"
        ]
      },
      {
        "heading": "Training Pipeline and Data Challenges",
        "paragraphs": [
          "Training a multimodal detector requires carefully balanced datasets across all four modalities. I used FaceForensics++, ASVspoof, and custom-collected samples, with StratifiedKFold cross-validation to ensure robust evaluation.",
          "Data augmentation was critical — random compression artifacts, noise injection, and temporal jittering helped the model generalize beyond the training distribution."
        ],
        "images": []
      },
      {
        "heading": "Results and Deployment",
        "paragraphs": [
          "The combined system achieves significantly higher detection rates than any single modality alone, particularly on adversarial examples designed to fool face-only detectors.",
          "The FastAPI backend serves predictions via REST endpoints, with Docker containerization for consistent deployment. The React frontend provides real-time analysis with per-modality confidence breakdowns."
        ],
        "images": [
          "/images/cms/svW242XTP0J6OQ4zk9XflnjqxRQ.jpeg",
          "/images/cms/0WpkDjML9SeFblp0HONUfUfivIs.jpeg"
        ]
      },
      {
        "heading": "Lessons Learned",
        "paragraphs": [
          "The biggest lesson was that modality fusion is not just concatenation — learned attention weights dramatically outperformed simple averaging. Also, real-world deepfakes are far noisier than academic datasets, so aggressive augmentation was essential.",
          "If I were rebuilding from scratch, I would invest more in the voice pipeline early on — it turned out to be the most discriminative modality for detecting AI-generated content."
        ],
        "images": [
          "/images/cms/VRQgkdWsjawSg1qpCm45HfSY1I.jpeg"
        ]
      }
    ]
  },
  {
    "slug": "autonomous-linkedin-ats-pipeline-with-n8n-gemini-and-supabase",
    "category": "Automation",
    "date": "May 28, 2025",
    "title": "Autonomous LinkedIn ATS Pipeline with n8n, Gemini & Supabase",
    "excerpt": "How I built an end-to-end n8n workflow that scrapes LinkedIn internships, tailors ATS-optimized resumes with Gemini, compiles them to PDF, and delivers a daily digest — fully autonomous.",
    "cover": "/images/cms/1wFj19qQG6zNr7gj3iTlH0Gdlu8.jpeg",
    "pinned": false,
    "sections": [
      {
        "heading": "Why Manual Applications Don't Scale",
        "paragraphs": [
          "Manually customizing resumes and writing cold emails for each internship posting doesn't scale beyond a few applications per week. Each role needs a tailored resume that passes ATS keyword filters and a personalized outreach email — doing this by hand for dozens of roles daily is unsustainable.",
          "I wanted a pipeline that could handle the entire lifecycle autonomously: discover relevant postings, tailor my resume for each one, generate a cold email, and deliver everything in a single daily digest."
        ],
        "images": [
          "/images/cms/KZSosvptNF0efYHxEFeY4i66s0.jpeg"
        ]
      },
      {
        "heading": "Six-Stage Pipeline Architecture",
        "paragraphs": [
          "n8n orchestrates the full workflow on a daily schedule. Stage 1 loads the user's resume from Google Docs and scrapes fresh LinkedIn postings via an Apify actor. Stage 2 parses, filters, and deduplicates against a Supabase Postgres database so no job is processed twice.",
          "Stage 3 is the core: a Gemini-powered ATS optimizer rewrites the resume for each specific job — grounded strictly in real, verifiable experience, never inventing credentials. Stage 4 drafts a tailored cold outreach email via a second Gemini chain. Stage 5 logs everything to Supabase, and Stage 6 compiles the resume to PDF via LaTeX-on-HTTP, uploads to Google Drive, and sends the daily HTML digest via Gmail."
        ],
        "images": [
          "/images/cms/RFcUbpIGFydbU9WBSTc9HJRQI.jpeg"
        ]
      },
      {
        "heading": "Keeping the LLM Honest",
        "paragraphs": [
          "The hardest constraint was ensuring Gemini never fabricates experience. The ATS optimizer agent is prompted to only rephrase, reorder, and emphasize facts already present in the source resume — never adding skills, roles, or achievements that don't exist.",
          "This required iterative prompt engineering and manual auditing of outputs. The system prompt explicitly instructs the model that all content must trace back to the original resume, and the generated LaTeX is structured to make verification straightforward."
        ],
        "images": []
      },
      {
        "heading": "Error Handling and Deduplication",
        "paragraphs": [
          "Real-world automation means handling failures gracefully. The workflow includes a dedicated error-handling branch for Apify timeouts, Gemini output parsing failures, and LaTeX compilation edge cases.",
          "Supabase deduplication uses a unique constraint on job_url — if a posting has already been processed, it's skipped entirely. This keeps costs predictable and prevents duplicate applications."
        ],
        "images": [
          "/images/cms/7i3y7S8hh5RjwFKy8VAstpXwRLM.jpeg",
          "/images/cms/VjFhPmRUqOEECNBJzS5qTNQ2M.jpeg"
        ]
      },
      {
        "heading": "Results and What I'd Change",
        "paragraphs": [
          "The pipeline runs daily at 7 AM and processes dozens of postings per run. The full stack — n8n, Apify, Google Gemini, LaTeX-on-HTTP, Supabase, Google Drive, Gmail — runs entirely on free tiers, making it cost-effective for students.",
          "If I were rebuilding, I'd add a scoring layer between scraping and resume generation so only high-relevance postings get the full treatment. I'd also explore self-hosted n8n via Docker for tighter control over scheduling and secrets management."
        ],
        "images": [
          "/images/cms/wOCTh6BhMTLrGPZ7C8doO3XdY.jpeg"
        ]
      }
    ]
  },
  {
    "slug": "deploying-fastapi-docker-on-cpu-only-hardware",
    "category": "MLOps",
    "date": "May 10, 2025",
    "title": "Deploying FastAPI + Docker on CPU-Only Hardware",
    "excerpt": "Practical lessons from deploying ML-powered APIs on budget hardware without GPU access — model optimization, containerization, and monitoring.",
    "cover": "/images/cms/mu6sFIgrbmHNxa3m94cG4VVROM.jpeg",
    "pinned": false,
    "sections": [
      {
        "heading": "When You Don't Have a GPU",
        "paragraphs": [
          "Not every ML deployment needs a GPU. Many inference tasks — classification, NER, feature extraction with smaller models — run perfectly well on CPU if you optimize correctly. The cost savings are significant: a CPU-only VPS costs a fraction of a GPU instance.",
          "This post covers the practical steps I took to deploy ML-backed FastAPI services on standard cloud VMs, from model quantization to Docker optimization."
        ],
        "images": [
          "/images/cms/iwNXp5FbnVuonnC3boDtFbw8Mk.jpg"
        ]
      },
      {
        "heading": "Model Optimization for CPU Inference",
        "paragraphs": [
          "The first step is making the model CPU-friendly. ONNX Runtime with INT8 quantization reduced inference latency by 3x compared to raw PyTorch on the same hardware. For scikit-learn models, joblib serialization with memory-mapped arrays keeps startup time under 2 seconds.",
          "Batch inference is another win — instead of processing requests one at a time, I queue incoming requests and process them in micro-batches every 100ms, improving throughput without perceptible latency increase."
        ],
        "images": [
          "/images/cms/pBomVdcuB4wJ0fztyHGeVZG4.jpg"
        ]
      },
      {
        "heading": "Docker Multi-Stage Builds",
        "paragraphs": [
          "A naive Dockerfile with PyTorch and all dependencies produces a 4GB+ image. Multi-stage builds cut this dramatically — the build stage installs dependencies and compiles extensions, while the runtime stage copies only the artifacts needed for inference.",
          "Using python:3.11-slim as the runtime base, with explicit COPY of only the model files and compiled wheels, brought the final image down to under 800MB."
        ],
        "images": [
          "/images/cms/18DzIP3ws1AmXZWDyjRKSceQmRU.jpeg",
          "/images/cms/QY6drXCswOtdH5g7g8gHn9nbx8.jpeg"
        ]
      },
      {
        "heading": "Health Checks and Monitoring",
        "paragraphs": [
          "FastAPI's built-in dependency injection makes health checks clean — a /health endpoint that verifies the model is loaded and can produce inference. Docker HEALTHCHECK directives restart containers that fail these checks automatically.",
          "For monitoring, structured JSON logging with request latency, model confidence scores, and error rates provides the observability needed to catch degradation before users notice."
        ],
        "images": [
          "/images/cms/RPxWdsXRtMBhMcTCb414zGg2QY.jpeg"
        ]
      }
    ]
  },
  {
    "slug": "what-i-learned-from-placing-top-5-at-vibexathon",
    "category": "Hackathon",
    "date": "Apr 22, 2025",
    "title": "What I Learned from Placing Top 5 at VibeXathon 1.0",
    "excerpt": "Reflections on competing in a national hackathon — from rapid prototyping under pressure to presenting technical work to non-technical judges.",
    "cover": "/images/cms/RFcUbpIGFydbU9WBSTc9HJRQI.jpeg",
    "pinned": false,
    "sections": [
      {
        "heading": "The 48-Hour Constraint",
        "paragraphs": [
          "Hackathons compress the entire development lifecycle into a pressure cooker. At VibeXathon 1.0, we had 48 hours to go from problem statement to working demo. The temptation is to start coding immediately, but the teams that placed well — including ours — spent the first 3-4 hours purely on problem definition and architecture.",
          "The key insight: in a hackathon, you cannot afford to pivot your architecture at hour 30. Get the foundation right early, even if it means less feature time."
        ],
        "images": [
          "/images/cms/WJiP9gqUvP0WmLo6pS4JVzdFTN0.jpeg"
        ]
      },
      {
        "heading": "Technical Choices That Mattered",
        "paragraphs": [
          "We built a predictive maintenance system using sensor data from industrial equipment. The stack was FastAPI + React + a lightweight gradient boosting model. The model choice was deliberate — we needed something that could train on the provided dataset in minutes, not hours.",
          "Using pre-built UI components (shadcn/ui) and a well-structured FastAPI template saved roughly 8 hours of boilerplate. That time went directly into model iteration and demo polish."
        ],
        "images": [
          "/images/cms/EN8OHeI7EADX5aQhFTV6KCU2Jsw.jpg"
        ]
      },
      {
        "heading": "Presenting to Non-Technical Judges",
        "paragraphs": [
          "The demo round was where most teams fell apart. Judges didn't care about your model architecture — they wanted to see the problem, the solution, and the impact. Our presentation led with the business case (downtime costs in manufacturing), showed a 30-second live demo, and closed with quantified results.",
          "One lesson I'll carry forward: practice your demo with someone who knows nothing about your project. If they can explain it back to you, your presentation is ready."
        ],
        "images": [
          "/images/cms/vmqbaFFQzmOGD7MZl3DbR38Pmo.jpeg",
          "/images/cms/AQyIdhIsQfYxzXoj7uBtxQZiY.jpeg"
        ]
      },
      {
        "heading": "What I Would Do Differently",
        "paragraphs": [
          "If I could redo it: I would have set up CI/CD from hour one. We wasted time on manual deployments and environment mismatches between team members. A simple GitHub Actions pipeline to a staging URL would have saved at least 2 hours of debugging.",
          "Also, sleep. We pulled an all-nighter on night two and the quality of our code — and our presentation delivery — noticeably suffered. Strategic rest beats brute-force coding every time."
        ],
        "images": [
          "/images/cms/SxCkVjSJk1iZkf6btuvbEfdCo.jpg"
        ]
      }
    ]
  },
  {
    "slug": "edge-ai-with-yolov8-nano-on-raspberry-pi-4",
    "category": "Edge AI",
    "date": "Mar 30, 2025",
    "title": "Edge AI with YOLOv8-Nano on Raspberry Pi 4",
    "excerpt": "Running real-time object detection on a $50 board — model export, NCNN inference, and the performance tradeoffs of edge deployment.",
    "cover": "/images/cms/9HduiIXX5eSq1WREpvO4qCnKM.jpeg",
    "pinned": false,
    "sections": [
      {
        "heading": "Why Edge AI Matters",
        "paragraphs": [
          "Cloud inference adds latency, requires connectivity, and costs money per request. For applications like agricultural monitoring, industrial inspection, or security cameras in remote locations, running inference on the device itself is the only practical option.",
          "The Raspberry Pi 4 is the sweet spot for prototyping edge AI — affordable, widely available, and powerful enough to run optimized models at usable framerates."
        ],
        "images": [
          "/images/cms/BOEIP00bQPlng3cm4ejsLhS4.jpg"
        ]
      },
      {
        "heading": "Model Export: From PyTorch to NCNN",
        "paragraphs": [
          "YOLOv8-Nano is already designed for edge deployment, but running it efficiently on ARM requires the right inference framework. NCNN, developed by Tencent, is optimized for mobile and embedded ARM processors.",
          "The export pipeline goes: PyTorch → ONNX → NCNN. Each conversion step requires careful validation — I compare detection outputs at every stage to catch quantization-induced accuracy drops."
        ],
        "images": [
          "/images/cms/TUsnrglMiwCSVuIMh7SMp4ZTsTY.jpg"
        ]
      },
      {
        "heading": "Performance Tuning on ARM",
        "paragraphs": [
          "Out of the box, YOLOv8-Nano runs at roughly 5 FPS on the Pi 4 with NCNN. With input resolution reduced to 320x320 (from 640x640), threading optimized for 4 cores, and INT8 quantization applied, I pushed this to 12-15 FPS — fast enough for most monitoring applications.",
          "Memory is the real constraint. The Pi 4's 4GB RAM must be shared between the OS, the camera pipeline, and the inference engine. Careful buffer management prevents OOM kills during sustained operation."
        ],
        "images": [
          "/images/cms/RPxWdsXRtMBhMcTCb414zGg2QY.jpeg",
          "/images/cms/Ov53jG8lAoAFuct0Li7vWgmOqQ.jpeg"
        ]
      },
      {
        "heading": "Real-World Deployment: Saffron Harvest Detection",
        "paragraphs": [
          "The concrete application was KesarAI — detecting saffron flower maturity in field conditions for optimal harvest timing. The model was fine-tuned on a custom dataset of saffron flowers at various growth stages.",
          "In field testing, the system achieved reliable detection at 10+ FPS with the Pi camera module, running continuously on battery power for 6+ hours. The detections are logged locally and synced to a dashboard when connectivity is available."
        ],
        "images": [
          "/images/cms/SwpRGJ8ix34GqgY7mO5FUq2Ao.jpg"
        ]
      }
    ]
  },
  {
    "slug": "building-real-time-industrial-predictive-maintenance-dashboard",
    "category": "Projects",
    "date": "Apr 5, 2025",
    "title": "How I Built a Real-Time Industrial Predictive Maintenance Dashboard",
    "excerpt": "From sensor data ingestion to anomaly detection and live visualization — the full stack behind AegisAI's predictive maintenance system.",
    "cover": "/images/cms/7RrI1CE0NHr8L8o3ZXGWxQDFQc.jpeg",
    "pinned": false,
    "sections": [
      {
        "heading": "The Problem: Unplanned Downtime",
        "paragraphs": [
          "Industrial equipment failures cost manufacturers millions in unplanned downtime. Traditional maintenance is either reactive (fix it when it breaks) or calendar-based (replace parts on a schedule regardless of condition). Predictive maintenance uses sensor data to detect early signs of failure, enabling intervention before breakdown.",
          "AegisAI was built at Hack Malenadu '26 to demonstrate that effective predictive maintenance doesn't require expensive proprietary platforms — it can be built with open-source tools and standard cloud infrastructure."
        ],
        "images": [
          "/images/cms/wsBID68mhSRCM7OkmkIO2NIc.jpg"
        ]
      },
      {
        "heading": "Data Pipeline: Ingestion to Feature Engineering",
        "paragraphs": [
          "The pipeline ingests time-series sensor data — temperature, vibration, pressure, and RPM readings from industrial motors. Raw readings are noisy, so feature engineering is critical: rolling statistics (mean, std, skewness over sliding windows), frequency-domain features via FFT, and rate-of-change indicators.",
          "FastAPI handles the ingestion endpoints, with PostgreSQL storing both raw readings and computed features. The pipeline processes incoming data in near-real-time, computing features incrementally rather than reprocessing full history."
        ],
        "images": [
          "/images/cms/4vGPV1cpmZowlqCz1jwaKndXo.jpg"
        ]
      },
      {
        "heading": "Anomaly Detection Model",
        "paragraphs": [
          "The detection model is an Isolation Forest trained on normal operating data — it learns what \"healthy\" looks like and flags deviations. This unsupervised approach is practical because labeled failure data is scarce in most industrial settings.",
          "The model runs on a 5-minute evaluation cycle, scoring each equipment unit's recent feature vectors against the learned baseline. Scores exceeding the threshold trigger alerts with severity levels based on how far the reading deviates from normal."
        ],
        "images": [
          "/images/cms/xmKml0E7v2iBI4zbbj0yVccaQwg.jpeg",
          "/images/cms/SxCkVjSJk1iZkf6btuvbEfdCo.jpg"
        ]
      },
      {
        "heading": "Dashboard and Visualization",
        "paragraphs": [
          "The React dashboard displays live sensor readings, anomaly scores over time, and equipment health status. Real-time updates use Server-Sent Events (SSE) from the FastAPI backend — simpler and more reliable than WebSockets for this one-directional data flow.",
          "Each equipment card shows current status (green/yellow/red), trend sparklines for key metrics, and a drill-down view with full sensor history and model explanations for flagged anomalies."
        ],
        "images": [
          "/images/cms/ftgLt3wWB2wrmUqDaOXqZwo66FA.jpeg"
        ]
      }
    ]
  }
];

export function getBlog(slug: string): BlogPost | undefined {
  return blogs.find((b) => b.slug === slug);
}

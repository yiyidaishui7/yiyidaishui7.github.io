---
layout: post
title: "Agent 开发实战：在小红书构建 LLM-as-Judge 评价体系"
date: 2026-04-10
tags: [Agent, LLM, Internship]
author: skye
---

在大规模 Agent 业务流中，如何准确、客观地评价模型输出是一个核心痛点。在小红书实习期间，我主导构建了一套基于 **LLM-as-Judge** 的自动化评审框架，解决了传统人工评估效率低、覆盖面窄的问题。

### 核心挑战
Agent 的输出通常具有高度的开放性和不确定性。传统的 ROUGE 或 BLEU 等指标在语义理解和指令遵循度（Instruction Following）的评估上显得捉襟见肘。

### 解决方案：LLM-as-Judge
我们选用了性能更强的大模型（如 GPT-4）作为裁判，通过精心设计的 Prompt，从**事实准确性、逻辑完备性、语气友好度**等多个维度对业务模型进行评分。

1. **Prompt Engineering**：为裁判模型提供详细的评分准则（Rubrics）和 Few-shot 示例，显著提升了评分的稳定性和一致性。
2. **数据闭环**：通过对线上行为的回捞，识别出用户反馈较差的情景（Hard Cases），将其注入评审系统。
3. **DPO 微调**：将裁判模型的评分结果作为偏好数据，利用 **DPO (Direct Preference Optimization)** 算法对业务模型进行持续迭代，实现了模型能力的自我进化。

### 总结
LLM-as-Judge 不仅仅是一个评分工具，它更是 Agent 迭代的“指南针”。通过构建这一闭环，我们成功将模型在特定垂直领域的指令遵循成功率提升了 15% 以上。

---
layout: portfolio
title: Air Quality
date: 2022-04-14T22:43:38.267Z
areas: Data Analysis
description: Measuring air quality at a local level using public sensors.
thumbnail: https://upload.wikimedia.org/wikipedia/commons/2/2c/20-chicago-mckinley-park.jpg
imgtext: "Landscape shot of McKinley Park (Source: Alfred Twu -
  https://commons.wikimedia.org/w/index.php?curid=46089200)"
alt: "Landscape shot of McKinley Park (Source: Alfred Twu -
  https://commons.wikimedia.org/w/index.php?curid=46089200)"
is_preview: false
is_archived: false
---
## Overview

### The Challenge

Use publicly available data from low-cost air quality sensors to determine whether more localized air quality measures can identify neighborhoods with air quality worse than indicated by EPA reporting.

### Approach

Code for Chicago compared six weeks of Chicago EPA data to three PurpleAir sensors from McKinley Park to determine if air quality from a more urban, industrial neighborhood aligns with the Air Quality Index from the Greater Chicago Area.

### Project Month/Year

September 2021 to March 2022

![Map of McKinley Park and Chicago, IL](/images/uploads/Site_Map-Air_Quality.png "Map of McKinley Park and Chicago, IL")

## Problem Statement

Current Chicago-area Air Quality Index (AQI) measures, which help people determine how safe the air is to breathe on any given day, are based off of nine EPA sensors located largely in the suburbs surrounding Chicago. We hypothesized that these suburban-located sensors may not accurately represent air quality in more urban and industrial neighborhoods. As such, the AQI may disproportionately represent wealthier populations, while more economically-disadvantaged neighborhoods may remain unaware of the magnitude of air quality hazards.

## Our Approach

To test this hypothesis, we decided to compare particular matter concentrations (PM2.5) from the EPA to low-cost local sensors (PurpleAir) in the McKinley Park neighborhood of Chicago. McKinley Park was chosen as an example because it is a more industrial neighborhood near central Chicago which already had at least three PurpleAir sensors. Because air quality fluctuates over time and typically becomes worse in the Summer months, we compared seven weeks of data from Summer and Fall of 2021.

## Methodology

Our baseline AQI data was pulled from five EPA sensors in the Chicago area using the AirNow API. These five were chosen because they had PM2.5 data. For localized air quality data, we gathered PM2.5 readings from three PurpleAir sensors in the McKinley Park neighborhood using the Thingspeak API, which stores open PurpleAir data. Three weeks of readings were gathered from July 2021 and another four weeks from October 2021. These readings were then averaged to daily readings for Chicago (EPA) and McKinley Park (PurpleAir). It was discovered that PurpleAir sensors are consistently high in their PM2.5 readings, particularly in high humidity environments. To correct for this, we used the sensors’ humidity readings to adjust the data using an EPA correction formula.

## Outcome

We found that even after applying the EPA correction factor for PurpleAir sensors, the air quality is consistently worse in McKinley Park compared to the greater Chicago area readings from the EPA’s AirNow. This is especially true in the Summer months. However, PM2.5 pollution was not high enough to consistently change the AirNow AQI warning. For this reason, we believe that localized air quality measures using affordable sensors is a better way to measure the local pollution concentrations, but that area wide AQI warnings likely serve as a good indicator of general air quality trends.

[Github Repository](https://github.com/Code-For-Chicago/Air-Quality)
[Literature Review](https://github.com/Code-For-Chicago/Air-Quality/blob/main/docs/Health%20Effects%20of%20Air%20Pollution%20+%20Literature%20Summary.txt)

![Purple Air Data](/images/uploads/purple-air.png "Purple Air Data")
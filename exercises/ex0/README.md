# Exercise 0 - Get to Know the Application and Landscape

In this exercise, you will familiarise yourself with the sample application and the SAP BTP landscape used throughout the hands-on. At the end, you will know which subaccounts are involved, what the application does, and where the transport pipeline starts.

## Exercise 0.1 - Review the Application

The hands-on uses a prepared GitHub repository containing a CAP bookshop application that is already configured for deployment on SAP BTP.

The application has two important characteristics:

- It depends on the **SAP Destination service** — a binding that must exist in the target subaccount for the deployment to succeed.
- It intentionally generates increasing RSS memory consumption and continuously writes corresponding application logs — giving you observable signals to investigate later in the hands-on.

You do not need to clone or modify the repository. It is already connected to the transport pipeline and a deployment artifact will be created in Exercise 1.

## Exercise 0.2 - Review the SAP BTP Landscape

The hands-on uses three subaccounts:

| Subaccount | Role | What it hosts |
|---|---|---|
| `XP260_S0XX` | Source | SAP Cloud Transport Management, SAP Content Agent Service, the Git repository connection, SAP Automation Pilot |
| `XP260_T0XX` | Target | The deployed bookshop application, SAP Cloud Logging |

Replace `XX` with your seat number (e.g., `XP260_S001` for seat 01).

1. Open the [BTP Cockpit](https://emea.cockpit.btp.cloud.sap/cockpit/?idp=tdct3ched1.accounts.ondemand.com) and sign in with your participant credentials (`xp260-0XX@education.cloud.sap`).

2. Confirm you can see the **XP260_S0XX** (source) and **XP260_T0XX** (target) subaccounts in your global account.

## Summary

You have reviewed the bookshop application and the two-subaccount BTP landscape used in this hands-on.

Continue to - [Exercise 1 - Export an Application with SAP Content Agent Service](../ex1/README.md)

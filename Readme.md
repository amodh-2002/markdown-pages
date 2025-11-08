# Project Velocity: Application and Infrastructure Modernization on EKS

---

## Quick Introduction (For Interviews/Resume)

### Project Description

**Project Velocity** was a comprehensive DevOps modernization initiative that transformed a legacy Testing Portal application (Spring Boot + Angular) from a monolithic EC2 deployment to a containerized, scalable architecture on Amazon EKS. The Testing Portal is an enterprise test automation management platform enabling teams to create, manage, execute, and monitor automated test suites across multiple environments.

### My Role & Key Contributions

As the **DevOps Engineer** on this project, I architected and implemented the complete infrastructure modernization. I developed Terraform modules for EKS cluster provisioning with EC2 managed node groups, authored a multi-stage Dockerfile that reduced image size by 60%, created comprehensive Helm charts for Kubernetes deployments with environment-specific ConfigMaps, and built an end-to-end CI/CD pipeline in Azure DevOps that automated the entire release process. Additionally, I configured Prometheus and Grafana for application monitoring, developing custom dashboards to track KPIs like latency and error rates. The project achieved a **95% reduction in deployment time** (from 4 hours to 15 minutes), **99.9% uptime** with automatic recovery, and a **40% reduction in infrastructure costs**.

**Key Technologies**: AWS (EKS, ECR, EC2, IAM), Terraform, Docker, Helm, Azure DevOps CI/CD, Prometheus, Grafana, Kubernetes, Spring Boot, Angular

---

## 1. Project Understanding

### Overview

**Project Velocity** is a comprehensive DevOps modernization initiative that transformed a legacy Testing Portal application from a monolithic deployment on EC2 to a containerized, scalable microservices architecture running on Amazon EKS (Elastic Kubernetes Service). The Testing Portal is an enterprise-grade test automation management platform that enables teams to create, manage, execute, and monitor automated test suites across multiple environments.

### Main Goals

- **Containerization**: Migrate the monolithic Spring Boot application from EC2 to containerized architecture
- **Scalability**: Enable horizontal scaling to handle variable workloads and concurrent test executions
- **Reliability**: Improve service resilience with Kubernetes self-healing capabilities and automated deployments
- **Velocity**: Reduce deployment time from 4 hours of manual work to fully automated CI/CD pipeline
- **Observability**: Implement comprehensive monitoring and alerting for proactive incident management

### Problem Statement

The legacy application was deployed on a single EC2 instance with manual deployment processes that:

- Required 4+ hours for each deployment cycle
- Had no automated scaling capabilities
- Lacked proper monitoring and alerting
- Suffered from single points of failure
- Made environment promotion (Dev → QA → UAT → Prod) error-prone and time-consuming

### Business Value

- **Deployment Velocity**: 95% reduction in deployment time (4 hours → 15 minutes)
- **Service Resilience**: 99.9% uptime with automatic pod recovery and health checks
- **Cost Optimization**: 40% reduction in infrastructure costs through efficient resource utilization
- **Developer Productivity**: Automated deployments freed up 20+ hours per week for development work
- **Quality Improvement**: Automated testing and security scanning in CI/CD pipeline reduced production incidents by 60%

### Key Features of the Testing Portal Application

1. **User Authentication & Authorization**: JWT-based authentication with refresh token mechanism
2. **Test Script Management**: Create, edit, and version control test scripts
3. **Test Suite Management**: Organize test scripts into reusable test suites with hierarchical grouping
4. **Test Queue Execution**: Queue-based test execution with real-time status tracking
5. **Object Mapping**: Manage UI element mappings for test automation
6. **Test Data Management**: Centralized test data repository with environment-specific configurations
7. **Execution Reports**: Comprehensive reporting with drill-down capabilities (Queue → Suite → Group → Script)
8. **Admin Dashboard**: User management, project configuration, and environment mapping
9. **Multi-Environment Support**: Manage test executions across Development, QA, UAT, and Production environments

---

## 2. Environments and Terminologies

### Environment Structure

#### **Development Environment**

- **Purpose**: Active development and feature implementation
- **Infrastructure**: EKS cluster with minimal node capacity (2-3 nodes)
- **Database**: MariaDB instance (RDS or containerized)
- **Access**: Development team has full access for testing new features
- **Deployment**: Automatic deployment on merge to `develop` branch
- **Monitoring**: Basic Prometheus metrics collection

#### **QA/Testing Environment**

- **Purpose**: Quality assurance testing and bug validation
- **Infrastructure**: EKS cluster with moderate capacity (3-4 nodes)
- **Database**: Isolated MariaDB instance with test data
- **Access**: QA team and developers
- **Deployment**: Automatic deployment on merge to `qa` branch or manual trigger
- **Testing**: Automated test execution for regression testing

#### **UAT (User Acceptance Testing) Environment**

- **Purpose**: Stakeholder validation and business acceptance testing
- **Infrastructure**: EKS cluster with production-like configuration (4-5 nodes)
- **Database**: Production-like data volume for realistic testing
- **Access**: Business stakeholders, product owners, and QA team
- **Deployment**: Manual approval gate required before deployment
- **Data**: Anonymized production data or realistic test datasets

#### **Production Environment**

- **Purpose**: Live production environment serving end users
- **Infrastructure**: EKS cluster with high availability (5+ nodes across multiple AZs)
- **Database**: RDS MariaDB with Multi-AZ deployment, automated backups
- **Access**: Restricted access with approval workflows
- **Deployment**: Requires approval from DevOps lead and change management ticket
- **Monitoring**: Full observability stack (Prometheus, Grafana, CloudWatch)
- **Disaster Recovery**: Automated backups, point-in-time recovery, and disaster recovery procedures

### Key Terminologies

- **EKS (Elastic Kubernetes Service)**: AWS managed Kubernetes service hosting containerized applications
- **ECR (Elastic Container Registry)**: AWS container registry storing Docker images
- **EC2 Managed Node Groups**: Auto-scaling groups of EC2 instances running Kubernetes worker nodes
- **Helm Chart**: Kubernetes package manager for templating and deploying applications
- **ConfigMap**: Kubernetes object storing environment-specific configuration
- **Pod**: Smallest deployable unit in Kubernetes, running one or more containers
- **Service**: Kubernetes abstraction for exposing pods with stable network endpoint
- **Ingress**: Kubernetes resource for managing external HTTP/HTTPS access
- **Prometheus**: Time-series database and monitoring system
- **Grafana**: Visualization and analytics platform for metrics
- **Terraform**: Infrastructure as Code (IaC) tool for provisioning AWS resources

---

## 3. End-to-End Flow

### Application Lifecycle Journey

```
┌─────────────────────────────────────────────────────────────────┐
│                    REQUIREMENT & PLANNING                         │
│  Product Owner creates user story in Jira/Azure DevOps          │
│  → Story assigned to development team                            │
│  → Technical design and architecture review                     │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DEVELOPMENT PHASE                            │
│  Developer creates feature branch from 'develop'                │
│  → Implements feature (Backend: Java/Spring Boot)                │
│  → Implements UI (Frontend: Angular 17)                         │
│  → Writes unit tests                                             │
│  → Commits code to Git repository                               │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CODE COMMIT & PUSH                             │
│  Developer pushes code to feature branch                         │
│  → Triggers CI pipeline (Azure DevOps)                          │
│  → Static code analysis (SonarQube)                             │
│  → Security scanning (Snyk/OWASP)                               │
│  → Unit test execution                                          │
│  → Code coverage report generation                              │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PULL REQUEST & REVIEW                          │
│  Developer creates Pull Request to 'develop' branch              │
│  → Peer code review (2 approvals required)                     │
│  → Automated checks must pass (quality gates)                   │
│  → Merge to 'develop' branch                                    │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CI/CD PIPELINE TRIGGER                         │
│  Azure DevOps pipeline automatically triggered                  │
│  → Build stage: Maven build for backend                         │
│  → Build stage: npm build for frontend                          │
│  → Test stage: Integration tests                                │
│  → Security scan: Docker image vulnerability scanning           │
│  → Package: Create Docker images                                │
│  → Push: Upload images to Amazon ECR                            │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    DEPLOYMENT TO DEV                             │
│  Helm chart updated with new image tags                         │
│  → Deploy to EKS Dev cluster                                    │
│  → Kubernetes rolling update strategy                           │
│  → Health checks and readiness probes                           │
│  → Smoke tests execution                                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    TESTING & VALIDATION                           │
│  QA team performs manual testing                                │
│  → Automated regression test suite execution                    │
│  → Performance testing (if applicable)                          │
│  → Bug fixes and iterations                                     │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PROMOTION TO QA/UAT                           │
│  Merge 'develop' → 'qa' branch                                  │
│  → CI/CD pipeline triggered for QA environment                  │
│  → Same build, test, and deployment process                    │
│  → UAT deployment requires manual approval gate                │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PRODUCTION DEPLOYMENT                          │
│  Merge 'qa' → 'main' branch                                     │
│  → Change management ticket created                             │
│  → Manual approval from DevOps lead required                    │
│  → Production deployment with blue-green strategy               │
│  → Canary deployment for critical releases                     │
│  → Rollback capability if issues detected                       │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    MONITORING & OBSERVABILITY                     │
│  Prometheus scrapes metrics from application                    │
│  → Grafana dashboards visualize KPIs                            │
│  → Alerts configured for error rates, latency                   │
│  → CloudWatch logs aggregation                                 │
│  → Incident response if thresholds breached                     │
└─────────────────────────────────────────────────────────────────┘
```

### Detailed Flow Breakdown

**1. Development Phase**

- Developer works on feature branch locally
- Backend: Spring Boot application (Java 17) with REST APIs
- Frontend: Angular 17 SPA consuming backend APIs
- Database: MariaDB with Flyway migrations for schema versioning
- Local testing using Docker Compose for database

**2. CI Pipeline Stages**

- **Source**: Git repository (Azure Repos or GitHub)
- **Build**:
  - Backend: `mvn clean install` → Generates JAR artifact
  - Frontend: `npm install && ng build --prod` → Generates static assets
- **Test**: Unit tests, integration tests, code coverage
- **Quality Gates**: SonarQube analysis, security scanning
- **Package**: Multi-stage Dockerfile builds optimized image
- **Push**: Docker images tagged and pushed to ECR

**3. CD Pipeline Stages**

- **Deploy**: Helm chart deployment to EKS cluster
- **Verify**: Health checks, smoke tests
- **Monitor**: Metrics collection starts immediately

---

## 4. DevOps Tools and Automation

### CI/CD Pipeline Architecture

#### **Primary CI/CD Tool: Azure DevOps**

**Pipeline Stages:**

1. **Source Control**

   - Repository: Azure Repos (or GitHub)
   - Branching Strategy: GitFlow (main, develop, feature/_, release/_, hotfix/\*)
   - Triggers: Automatic on push, manual triggers available

2. **Build Stage**

   ```yaml
   - Build Backend:
     * Maven clean install
     * Compile Java 17 code
     * Run unit tests
     * Generate JAR artifact (TestingPortalBackend-0.0.1-SNAPSHOT.jar)
     * Code coverage report generation

   - Build Frontend:
     * npm install --legacy-peer-deps
     * ng build --configuration production
     * Generate optimized static assets in dist/
     * Bundle size analysis
   ```

3. **Static Analysis & Security**

   - **SonarQube**: Code quality analysis, code smells, technical debt
   - **Snyk**: Dependency vulnerability scanning
   - **OWASP Dependency Check**: Security vulnerability detection
   - **Quality Gates**: Pipeline fails if quality thresholds not met

4. **Docker Image Build**

   - **Multi-stage Dockerfile**:

     ```dockerfile
     # Stage 1: Build
     FROM maven:3.9-eclipse-temurin-17 AS build
     COPY pom.xml .
     RUN mvn dependency:go-offline
     COPY src ./src
     RUN mvn clean package -DskipTests

     # Stage 2: Runtime
     FROM eclipse-temurin:17-jre-alpine
     COPY --from=build /target/*.jar app.jar
     EXPOSE 8080
     ENTRYPOINT ["java", "-jar", "app.jar"]
     ```

   - Image size reduction: 60%+ (from ~800MB to ~300MB)
   - Security: Non-root user, minimal base image

5. **Container Registry**

   - **Amazon ECR**: Stores versioned Docker images
   - Image tagging strategy: `{branch}-{buildNumber}-{commitHash}`
   - Image scanning: AWS ECR image scanning for vulnerabilities

6. **Deployment Stage**

   - **Helm Chart**: Templated Kubernetes manifests
   - Environment-specific values files (dev-values.yaml, qa-values.yaml, prod-values.yaml)
   - ConfigMap updates for environment variables
   - Rolling update strategy for zero-downtime deployments

7. **Post-Deployment Verification**
   - Health check endpoints: `/actuator/health`
   - Smoke tests: Critical API endpoint validation
   - Integration test suite execution

### Additional DevOps Tools

- **Terraform**: Infrastructure provisioning

  - EKS cluster creation
  - EC2 managed node groups
  - IAM roles and policies
  - VPC, subnets, security groups
  - RDS MariaDB instances

- **Helm**: Kubernetes package management

  - Application deployment templates
  - ConfigMap and Secret management
  - Service and Ingress definitions
  - Horizontal Pod Autoscaler (HPA) configuration

- **Prometheus**: Metrics collection

  - Application metrics (JVM, Spring Boot Actuator)
  - Kubernetes metrics (CPU, memory, network)
  - Custom business metrics (test execution rates, queue processing times)

- **Grafana**: Visualization and dashboards

  - Application performance dashboards
  - Infrastructure monitoring
  - Business KPI dashboards (latency, error rates, throughput)

- **CloudWatch**: AWS native monitoring
  - Log aggregation
  - CloudWatch alarms
  - Container insights for EKS

---

## 5. Work Distribution and Roles

### Team Structure

#### **Development Team**

- **Backend Developers**: Spring Boot API development, database schema design
- **Frontend Developers**: Angular UI development, user experience
- **QA Engineers**: Test case creation, manual testing, test automation

#### **DevOps Team (Your Role)**

- **Infrastructure Management**: Terraform modules for EKS, EC2 node groups
- **CI/CD Pipeline Development**: Azure DevOps pipeline creation and maintenance
- **Containerization**: Dockerfile optimization, multi-stage builds
- **Kubernetes Configuration**: Helm charts, ConfigMaps, Secrets, Services
- **Monitoring Setup**: Prometheus, Grafana dashboard creation
- **Security**: IAM policies, network security, image scanning
- **Deployment Automation**: Environment promotion workflows

#### **Product Owner**

- User story creation and prioritization
- Requirement gathering and validation
- Stakeholder communication

#### **Scrum Master**

- Sprint planning and retrospectives
- Team coordination and blockers resolution

### Task Management

- **Tool**: Azure DevOps Boards (or Jira)
- **Work Items**:
  - **User Stories**: Feature development tasks
  - **Bugs**: Defect tracking and resolution
  - **Enhancements**: Improvement requests
  - **Technical Debt**: Infrastructure and code improvements

### Your Specific DevOps Responsibilities

1. **Infrastructure as Code**

   - Developed Terraform modules for EKS cluster provisioning
   - Created reusable modules for EC2 managed node groups
   - Configured auto-scaling policies and instance types
   - Implemented security best practices (IAM roles, security groups)

2. **Containerization**

   - Authored multi-stage Dockerfile reducing image size by 60%
   - Optimized build process for faster CI/CD execution
   - Implemented security best practices (non-root user, minimal base image)
   - Versioned images in Amazon ECR with proper tagging strategy

3. **Kubernetes Deployment**

   - Developed comprehensive Helm chart with:
     - Deployment manifests with resource limits
     - ConfigMap for environment-specific configurations
     - Service definitions for internal and external access
     - Ingress configuration for external routing
     - Horizontal Pod Autoscaler (HPA) for automatic scaling
   - Externalized all environment-specific settings to enable seamless promotion

4. **CI/CD Pipeline**

   - Built complete Azure DevOps pipeline automating:
     - Code compilation and testing
     - Docker image building and pushing to ECR
     - Helm chart deployment to EKS
     - Post-deployment verification
   - Reduced deployment time from 4 hours to 15 minutes

5. **Monitoring and Observability**
   - Configured Prometheus to scrape application and infrastructure metrics
   - Developed Grafana dashboards for:
     - Application KPIs (latency, error rates, request throughput)
     - Infrastructure metrics (CPU, memory, network)
     - Business metrics (test execution success rates, queue processing times)
   - Set up alerting rules for proactive incident response

---

## 6. Challenges Faced and Solutions

### Challenge 1: Docker Image Size Optimization

**Problem**: Initial Docker image was ~800MB, causing slow image pulls and increased storage costs.

**Solution**:

- Implemented multi-stage Docker build process
- Used Alpine Linux base image (eclipse-temurin:17-jre-alpine)
- Removed build dependencies from final image
- Result: Reduced image size to ~300MB (60% reduction)

**Impact**: Faster deployments, reduced ECR storage costs, improved container startup time

### Challenge 2: Database Connection Pooling in Kubernetes

**Problem**: Application pods were exhausting database connections, causing connection pool errors.

**Solution**:

- Configured HikariCP connection pool with appropriate sizing
- Implemented connection pool monitoring via Spring Boot Actuator
- Added database connection health checks
- Configured pod resource limits to prevent connection leaks

**Impact**: Stable database connections, improved application reliability

### Challenge 3: Environment-Specific Configuration Management

**Problem**: Hard-coded configuration values made environment promotion error-prone.

**Solution**:

- Externalized all configuration to Kubernetes ConfigMaps
- Created environment-specific Helm value files (dev-values.yaml, qa-values.yaml, prod-values.yaml)
- Used Helm templating for dynamic configuration injection
- Implemented secrets management using Kubernetes Secrets (encrypted at rest)

**Impact**: Seamless environment promotion, reduced configuration errors, improved security

### Challenge 4: Slow CI/CD Pipeline Execution

**Problem**: Initial pipeline took 45+ minutes, slowing down development velocity.

**Solution**:

- Implemented parallel build stages (backend and frontend build simultaneously)
- Added Maven dependency caching to avoid re-downloading dependencies
- Optimized Docker layer caching
- Used Azure DevOps pipeline caching for npm packages
- Result: Reduced pipeline time to ~15 minutes

**Impact**: Faster feedback loop, improved developer productivity

### Challenge 5: Application Monitoring and Alerting

**Problem**: No visibility into application health and performance post-deployment.

**Solution**:

- Integrated Spring Boot Actuator for application metrics
- Configured Prometheus to scrape metrics from Actuator endpoints
- Created comprehensive Grafana dashboards for:
  - Application latency (p50, p95, p99)
  - Error rates by endpoint
  - JVM metrics (heap usage, GC pauses)
  - Database connection pool metrics
- Set up alerting rules for:
  - High error rates (>1% for 5 minutes)
  - High latency (p95 > 2 seconds)
  - Pod restarts (>3 in 10 minutes)

**Impact**: Proactive incident detection, reduced MTTR (Mean Time To Recovery)

### Challenge 6: Zero-Downtime Deployments

**Problem**: Initial deployments caused brief service interruptions during updates.

**Solution**:

- Implemented Kubernetes rolling update strategy
- Configured readiness and liveness probes
- Added graceful shutdown handling in Spring Boot application
- Implemented connection draining for in-flight requests
- Used blue-green deployment strategy for production

**Impact**: Zero-downtime deployments, improved user experience

### Challenge 7: Security Vulnerabilities in Dependencies

**Problem**: Security scans revealed multiple high-severity vulnerabilities in dependencies.

**Solution**:

- Integrated Snyk and OWASP Dependency Check into CI pipeline
- Implemented quality gates that fail pipeline on critical vulnerabilities
- Created automated dependency update process
- Regular security audits and dependency updates
- Docker image scanning in ECR

**Impact**: Reduced security risk, compliance with security policies

---

## 7. Results and Impact

### Quantitative Results

#### **Deployment Velocity**

- **Before**: 4 hours manual deployment process
- **After**: 15 minutes automated pipeline
- **Improvement**: 95% reduction in deployment time
- **ROI**: Freed up 20+ hours per week for development work

#### **Service Reliability**

- **Uptime**: Achieved 99.9% uptime (from 95% previously)
- **MTTR**: Reduced from 2 hours to 15 minutes
- **Incident Reduction**: 60% reduction in production incidents
- **Pod Recovery**: Automatic recovery from failures in <2 minutes

#### **Infrastructure Efficiency**

- **Cost Reduction**: 40% reduction in infrastructure costs through:
  - Right-sized EC2 instances
  - Efficient resource utilization with HPA
  - Container density optimization
- **Scalability**: Automatic scaling from 2 to 10 pods based on load
- **Resource Utilization**: Improved from 30% to 70% average CPU utilization

#### **Code Quality**

- **Code Coverage**: Increased from 45% to 75% through automated testing
- **Security Vulnerabilities**: Reduced from 15 critical issues to 0
- **Technical Debt**: Reduced by 30% through automated code analysis

#### **Developer Productivity**

- **Deployment Frequency**: Increased from weekly to multiple times per day
- **Lead Time**: Reduced from 2 weeks to 2 days (code to production)
- **Failed Deployment Rate**: Reduced from 15% to <2%

### Qualitative Benefits

1. **Improved Developer Experience**

   - Automated deployments eliminate manual errors
   - Faster feedback loop enables rapid iteration
   - Self-service deployment capabilities

2. **Enhanced Observability**

   - Real-time visibility into application health
   - Proactive alerting prevents incidents
   - Comprehensive dashboards for stakeholders

3. **Better Security Posture**

   - Automated security scanning
   - Secrets management best practices
   - Network isolation and least-privilege access

4. **Scalability and Flexibility**

   - Easy horizontal scaling based on demand
   - Multi-environment support with consistent deployment process
   - Cloud-native architecture enables future microservices migration

5. **Business Agility**
   - Faster time-to-market for new features
   - Reduced risk through automated testing and validation
   - Improved customer satisfaction through reliable service

---

## 8. Bonus Topics to Highlight

### Code Coverage

**Coverage Percentage**: 75% code coverage across the application

**Measurement Tools**:

- **JaCoCo**: Java code coverage tool integrated with Maven
- **Istanbul**: JavaScript/TypeScript coverage for Angular frontend
- **SonarQube**: Centralized coverage reporting and quality gates

**Coverage Metrics**:

- Unit test coverage: 80% for service layer
- Integration test coverage: 60% for API endpoints
- E2E test coverage: 40% for critical user flows

**Quality Gates**:

- Minimum 70% code coverage required for new code
- Pipeline fails if coverage drops below threshold
- Coverage reports published as pipeline artifacts

**Why It Matters**:

- Early detection of bugs
- Confidence in refactoring
- Documentation through test cases
- Reduced production defects

### Security

**Static Code Analysis**:

- **SonarQube**: Code quality and security vulnerability detection
- **Snyk**: Dependency vulnerability scanning
- **OWASP Dependency Check**: Known vulnerability database scanning
- **Quality Gates**: Pipeline fails on critical/high severity issues

**Container Security**:

- **ECR Image Scanning**: Automated vulnerability scanning of Docker images
- **Multi-stage Builds**: Minimal attack surface with Alpine base images
- **Non-root User**: Containers run as non-privileged user
- **Secrets Management**: Kubernetes Secrets with encryption at rest

**Network Security**:

- **Security Groups**: Restrictive ingress/egress rules
- **Network Policies**: Kubernetes network isolation
- **TLS/SSL**: Encrypted communication between services
- **IAM Roles**: Least-privilege access principles

**Security Practices**:

- Regular dependency updates
- Automated security scanning in CI/CD
- Security audit logs
- Penetration testing for production

### Branching Strategy

**GitFlow Model**:

```
main (production)
  │
  ├── develop (integration branch)
  │     │
  │     ├── feature/* (feature development)
  │     ├── release/* (release preparation)
  │     └── hotfix/* (urgent production fixes)
  │
  └── qa (QA environment)
        │
        └── uat (UAT environment)
```

**Branch Purposes**:

- **main**: Production-ready code, protected branch
- **develop**: Integration branch for ongoing development
- **feature/\***: Individual feature development
- **release/\***: Release candidate preparation
- **hotfix/\***: Critical production fixes

**Code Promotion Flow**:

1. Feature branch → develop (after PR approval)
2. develop → qa (automatic on merge)
3. qa → uat (manual approval required)
4. uat → main (after UAT sign-off and change management)

**Protection Rules**:

- main and develop: Require 2 approvals, status checks must pass
- No direct pushes to main (only via merge)
- Automated testing required before merge

### Testing Strategy

**Unit Testing**:

- **Backend**: JUnit 5, Mockito for Spring Boot services
- **Frontend**: Jasmine, Karma for Angular components
- **Coverage**: 80% for business logic, 60% overall

**Integration Testing**:

- **API Testing**: Spring Boot Test for REST endpoints
- **Database Testing**: TestContainers for MariaDB integration tests
- **Coverage**: Critical API endpoints covered

**End-to-End Testing**:

- **Tool**: Cypress or Selenium (for critical user journeys)
- **Coverage**: Login, test execution, report generation flows
- **Execution**: Automated in QA environment post-deployment

**Performance Testing**:

- **Load Testing**: JMeter for API load testing
- **Metrics**: Response time, throughput, error rates
- **Thresholds**: p95 latency < 2 seconds under normal load

**Test Execution in Pipeline**:

- Unit tests: Every commit
- Integration tests: Pre-merge validation
- E2E tests: Post-deployment in QA/UAT
- Performance tests: Pre-production validation

### Artifacts

**Build Artifacts**:

- **Backend**: `TestingPortalBackend-0.0.1-SNAPSHOT.jar` (Spring Boot executable JAR)
- **Frontend**: Static assets (HTML, CSS, JS bundles) in `dist/` directory
- **Docker Images**: Multi-arch images (linux/amd64) stored in ECR

**Artifact Storage**:

- **Docker Images**: Amazon ECR (Elastic Container Registry)
  - Repository: `testing-portal-backend`
  - Tagging: `{branch}-{buildNumber}-{commitHash}`
  - Retention: 30 days for non-production, 90 days for production
- **Build Artifacts**: Azure DevOps Artifacts
  - JAR files, test reports, coverage reports
  - Retention: 30 days

**Artifact Versioning**:

- Semantic versioning for releases (v1.0.0, v1.1.0)
- Build numbers for CI builds (dev-123, qa-456)
- Git commit hash for traceability

**Artifact Promotion**:

- Same Docker image promoted across environments
- Environment-specific configuration via ConfigMaps
- No rebuild required for environment promotion

---

## 9. Deployment and Promotion Flows

### Automated Deployment Process

#### **Development Environment**

```
Trigger: Merge to 'develop' branch
Approval: None (automatic)
Process:
  1. CI pipeline builds and tests code
  2. Docker image built and pushed to ECR with tag 'dev-{buildNumber}'
  3. Helm chart updated with new image tag
  4. Deployment to EKS Dev cluster
  5. Rolling update with zero downtime
  6. Health checks verify deployment success
  7. Smoke tests executed
Duration: ~15 minutes
```

#### **QA Environment**

```
Trigger: Merge to 'qa' branch OR manual trigger from 'develop'
Approval: None (automatic for qa branch)
Process:
  1. Same CI pipeline execution
  2. Docker image tagged as 'qa-{buildNumber}'
  3. QA-specific ConfigMap values applied
  4. Deployment to EKS QA cluster
  5. Automated regression test suite execution
  6. Deployment marked successful if tests pass
Duration: ~20 minutes (includes test execution)
```

#### **UAT Environment**

```
Trigger: Manual approval from QA lead
Approval: Required (QA lead + Product Owner)
Process:
  1. Manual trigger from Azure DevOps pipeline
  2. Approval gate waits for sign-off
  3. Docker image tagged as 'uat-{buildNumber}'
  4. UAT-specific configuration applied
  5. Deployment to EKS UAT cluster
  6. Stakeholder notification sent
  7. Manual UAT testing by business users
Duration: ~25 minutes (deployment) + UAT testing time
```

#### **Production Environment**

```
Trigger: Merge to 'main' branch + Change Management ticket
Approval: Required (DevOps lead + Change Manager)
Process:
  1. Change management ticket created
  2. Pre-deployment checklist verified
  3. Manual approval from authorized personnel
  4. Blue-green deployment strategy:
     a. Deploy new version to "green" environment
     b. Run smoke tests and health checks
     c. Gradually shift traffic (10% → 50% → 100%)
     d. Monitor metrics for 30 minutes
     e. Complete cutover or rollback if issues detected
  5. Post-deployment verification
  6. Change ticket closed
Duration: ~30-45 minutes (including monitoring period)
Rollback: Automated rollback available if health checks fail
```

### Deployment Strategies

**Rolling Update** (Dev/QA/UAT):

- Gradual pod replacement
- Zero downtime
- Automatic rollback on health check failure

**Blue-Green Deployment** (Production):

- Two identical environments
- Instant traffic switch
- Easy rollback by switching traffic back

**Canary Deployment** (Critical Releases):

- Gradual traffic shift (10% → 50% → 100%)
- Real-time monitoring and metrics comparison
- Automatic rollback if error rate increases

### Approval Gates

1. **Code Quality Gate**: SonarQube quality gate must pass
2. **Security Gate**: No critical/high vulnerabilities
3. **Test Gate**: All unit and integration tests must pass
4. **Coverage Gate**: Code coverage above threshold
5. **Manual Approval**: Required for UAT and Production

### Rollback Procedures

**Automatic Rollback**:

- Health check failures trigger automatic rollback
- Kubernetes automatically reverts to previous deployment
- Alerts sent to DevOps team

**Manual Rollback**:

- Previous Docker image tag available in ECR
- Helm rollback command: `helm rollback <release-name> <revision>`
- Database migration rollback scripts available (if needed)

---

## 10. Tech Stack

### Application Stack

**Backend**:

- **Framework**: Spring Boot 3.3.0
- **Language**: Java 17
- **Build Tool**: Maven 3.9+
- **Database**: MariaDB 10.11+
- **ORM**: Spring Data JPA / Hibernate
- **Security**: Spring Security with JWT (JSON Web Tokens)
- **API**: RESTful APIs
- **Migration**: Flyway for database schema versioning
- **Monitoring**: Spring Boot Actuator for metrics

**Frontend**:

- **Framework**: Angular 17.2.0
- **Language**: TypeScript 5.3+
- **Build Tool**: Angular CLI, npm
- **UI Library**: Angular Material 18.0.4
- **HTTP Client**: Angular HttpClient (RxJS)
- **State Management**: Services with RxJS Observables

### Infrastructure Stack

**Cloud Platform**: Amazon Web Services (AWS)

- **Compute**: Amazon EKS (Elastic Kubernetes Service)
- **Container Registry**: Amazon ECR (Elastic Container Registry)
- **Compute Nodes**: EC2 Managed Node Groups (t3.medium, t3.large instances)
- **Database**: Amazon RDS for MariaDB (Multi-AZ for production)
- **Networking**: VPC, Subnets, Security Groups, Internet Gateway
- **IAM**: Roles and Policies for service authentication

**Containerization**:

- **Container Runtime**: Docker
- **Base Images**:
  - Build: `maven:3.9-eclipse-temurin-17`
  - Runtime: `eclipse-temurin:17-jre-alpine`
- **Image Registry**: Amazon ECR

**Orchestration**:

- **Platform**: Kubernetes 1.28+
- **Package Manager**: Helm 3.x
- **Service Mesh**: (Optional) AWS App Mesh for advanced traffic management

**Infrastructure as Code**:

- **Tool**: Terraform 1.5+
- **State Management**: Terraform Cloud or S3 backend
- **Modules**: Reusable modules for EKS, EC2, RDS, VPC

### CI/CD Stack

**CI/CD Platform**: Azure DevOps

- **Version Control**: Azure Repos (Git)
- **Build Pipelines**: Azure Pipelines (YAML)
- **Artifact Storage**: Azure Artifacts
- **Release Management**: Azure Pipelines (Multi-stage)

**Code Quality**:

- **Static Analysis**: SonarQube
- **Security Scanning**: Snyk, OWASP Dependency Check
- **Code Coverage**: JaCoCo (Java), Istanbul (TypeScript)

**Container Security**:

- **Image Scanning**: Amazon ECR Image Scanning
- **Vulnerability Database**: Snyk, OWASP

### Monitoring and Observability Stack

**Metrics Collection**:

- **Time-Series DB**: Prometheus
- **Metrics Export**: Spring Boot Actuator, Prometheus JMX Exporter
- **Scraping**: Prometheus Operator in Kubernetes

**Visualization**:

- **Dashboards**: Grafana
- **Custom Dashboards**: Application KPIs, Infrastructure metrics, Business metrics

**Logging**:

- **Log Aggregation**: CloudWatch Logs
- **Container Logs**: Fluentd/Fluent Bit → CloudWatch
- **Application Logs**: Logback → CloudWatch

**Alerting**:

- **Alert Manager**: Prometheus Alertmanager
- **Notifications**: PagerDuty, Slack, Email
- **CloudWatch Alarms**: AWS native alerting

### Additional Tools

**Database**:

- **Migration Tool**: Flyway
- **Connection Pooling**: HikariCP
- **Monitoring**: RDS Performance Insights

**Security**:

- **Secrets Management**: Kubernetes Secrets, AWS Secrets Manager (for production)
- **Certificate Management**: AWS Certificate Manager (ACM) for SSL/TLS
- **Network Security**: Security Groups, Network Policies

**Development Tools**:

- **IDE**: IntelliJ IDEA, VS Code
- **API Testing**: Postman, curl
- **Local Development**: Docker Compose

---

## Summary: Key Talking Points for Interview

### Elevator Pitch (30 seconds)

"Project Velocity modernized our Testing Portal application by containerizing a legacy Spring Boot monolith and migrating it from EC2 to Amazon EKS. I architected the complete DevOps pipeline using Terraform, Docker, Helm, and Azure DevOps, reducing deployment time from 4 hours to 15 minutes while achieving 99.9% uptime. The solution includes comprehensive monitoring with Prometheus and Grafana, enabling proactive incident response."

### Technical Highlights

1. **Multi-stage Dockerfile** reducing image size by 60%
2. **Comprehensive Helm chart** with environment-specific ConfigMaps
3. **Complete CI/CD pipeline** automating build, test, security scan, and deployment
4. **Terraform modules** for EKS infrastructure provisioning
5. **Grafana dashboards** for application and infrastructure monitoring

### Impact Metrics

- 95% reduction in deployment time
- 99.9% uptime with automatic recovery
- 40% cost reduction through optimization
- 60% reduction in production incidents
- 75% code coverage with automated testing

### Problem-Solving Examples

- Docker image optimization challenge
- Environment configuration management
- Zero-downtime deployment implementation
- Monitoring and alerting setup

### Questions to Expect and How to Answer

**Q: How did you handle database migrations in Kubernetes?**
A: "We used Flyway for database schema versioning. Flyway migrations are embedded in the Spring Boot application and run automatically on startup. For production, we use a separate init container that runs migrations before the application starts, ensuring schema consistency across all pods."

**Q: How do you handle secrets management?**
A: "We use Kubernetes Secrets for non-sensitive configuration and AWS Secrets Manager for production secrets like database passwords and API keys. Secrets are injected as environment variables or mounted as volumes, never committed to Git."

**Q: What's your rollback strategy?**
A: "We have both automatic and manual rollback capabilities. Kubernetes automatically rolls back if health checks fail. For manual rollbacks, we use Helm's rollback command to revert to a previous revision, and we maintain previous Docker images in ECR for quick recovery."

**Q: How do you monitor application performance?**
A: "We use Spring Boot Actuator to expose metrics, Prometheus to scrape and store them, and Grafana for visualization. We monitor key metrics like response latency (p50, p95, p99), error rates, JVM heap usage, and database connection pool status. Alerts are configured for thresholds that indicate potential issues."

**Q: How did you optimize the Docker image?**
A: "I implemented a multi-stage Docker build that separates build and runtime environments. We use Alpine Linux base images, remove build dependencies from the final image, and leverage Docker layer caching. This reduced our image size from 800MB to 300MB, improving pull times and reducing storage costs."

---

## Conclusion

Project Velocity successfully transformed a legacy application into a modern, cloud-native, scalable solution. The implementation demonstrates expertise in containerization, Kubernetes orchestration, CI/CD automation, infrastructure as code, and observability. The measurable improvements in deployment velocity, reliability, and cost efficiency showcase the value of DevOps practices and modern infrastructure.

This project serves as a comprehensive example of end-to-end DevOps engineering, from infrastructure provisioning to application deployment and monitoring, with a focus on automation, security, and operational excellence.

My_Projects
===========
I created this reposity to collect all my projects.
You can find:
- Open Network Management & Security (OpenNMS): a novel software-defined architecture overcoming Software Defined Networking (SDN) and Overlay Virtual Technologies (OVT) limitations. OpenNMS lifts several network virtualization roadblocks by combining these two separate approaches into an unified design. OpenNMS design leverages the benefits of SDN to provide Layer 2 (L2) isolation coupled with network overlay protocols with simple and flexible Virtual Tenant Slices (VTSs) abstractions.  This yields a network virtualization architecture that is both flexible, scalable and secure on one side, and self-manageable on the other. The experiment for OpenNMS results offers negligible overhead and guarantees the network performance while achieving the desired isolation goals. I implemented as 1.3 OpenFlow extension to NOX controller . For each VTS, we use one NOX to control allocated resources. The switches are based on the Ericsson|CPqD  software implementation with a modification in the forwarding plane to support OpenFlow 1.3. The NOX is based on Nicira's NOX controller, in which OpenFlow processing model is replaced with ``Oflib” from the OpenFlow 1.3 Software Switch.

- Cloud Defense Orchestration (CDO): a novel approach SDN and Network Functions Virtualization NFV based, to divide the complex security shield into small Security Modules (SMs) that can be orchestrated between distributed security appliances towards better security defense optimization. I implemented CDO as OpenStack orchestrator working in standalone mode like Heat. CDO was integrated with OpenDaylight environment to achieve the desired goals for SMs placements and chainning.




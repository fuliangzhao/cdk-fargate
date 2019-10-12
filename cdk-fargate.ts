import ec2 = require("@aws-cdk/aws-ec2");
import ecs = require("@aws-cdk/aws-ecs");
import ecs_patterns = require("@aws-cdk/aws-ecs-patterns");

export class CDKFargateStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const vpc = Vpc.fromLookup(this, 'VPC', {
      isDefault: true // Using Default VPC
    });

    const cluster = new Cluster(this, 'Cluster', {
      vpc
    });

    const taskDefinition = new TaskDefinition(this, 'Task', {
      compatibility: Compatibility.FARGATE,
      memoryMiB: '512',
      cpu: '256'
    })

    taskDefinition
      .addContainer('flask', {
        image: ContainerImage.fromRegistry('pahud/amazon-ecs-flask-sample'),
        environment: {
          'PLATFORM': AWS FARGATE(&{this.region})
        }
      })
      .addPortMappings({
        containerPort: 5000
      })

    const svc = new ApplicationLoadBalanceFargateService(this, 'FargateService', {
      cluster,
      taskDefinition
    })

  }
}
    // Create a load-balanced Fargate service and make it public
    //new ecs_patterns.ApplicationLoadBalancedFargateService(this, "MyFargateService", {
      //cluster: cluster, // Required
      //cpu: 512, // Default is 256
      //desiredCount: 6, // Default is 1
      //image: ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample"), // Required
      //memoryLimitMiB: 2048, // Default is 512
      //publicLoadBalancer: true // Default is false
    //});
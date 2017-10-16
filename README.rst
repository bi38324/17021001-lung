Big Data Management System API
===================================================================================================

1. 部署
---------------------------------------------------------------------------------------------------

本应用使用docker部署，具体步骤为:

具体分为两步：

第一步：构建依赖基础镜像，这一步只在第一次和以后依赖改变才需要运行

.. code-block:: bash

    $ git clone ssh://git@192.168.1.220:2222/og00/17020401-BDMS-API.git
    $ cd 17020401-BDMS-API
    $ docker build -f BaseDockerfile -t lixing1611/bdms_api_base .

第二步：基于刚刚构建的基础镜像构建API服务

.. code-block:: bash

    $ docker build -t lixing1611/bdms_api .  # 注意这里要小写
    $ docker run --name bdms_api -p 3010:3000 -d lixing1611/bdms_api

2. BDMS数据库使用说明
---------------------------------------------------------------------------------------------------

以Python为例，Python连接MongoDB最常用的驱动是PyMongo，以下以PyMongo为例：

1. Python 版本: 3.6
2. PyMongo版本: 3.4.0
3. MongoDB版本: 3.4.2

2.1 数据库概况
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

现在BDMS数据库共有7个表：

1. axiom_pmra_anno: Affy位点注释表
2. ov_sample: 样本表
3. ov_item: 疾病位点关系表
4. ov_detection_result: 检测结果表
5. ov_algorithm： 所有的算法表
6. ov_pipeline：所有的流程表
7. fs.files、fs.chunks：数据集表

2.2 如何连接数据库
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


.. code-block:: python

    import pymongo  # 导入PyMongo驱动

    client = pymongo.MongoClient('192.168.11.12')  # 新建一个MongoDB客户端实例
    db = client.get_database('bdms')  # 得到数据库实例， 传入的参数是数据库名称
    db.authenticate('some-user', 'some-password')
    # 认证数据库，传入两个值，分别是用户名和密码，如有需要请向李惺索取
    # 这样就建立了与数据库的连接，本说明以说明问题为前提，还有更简便的连接方法
    # 具体请参考PyMongo的文档: http://api.mongodb.com/python/current/tutorial.html
    # 在使用完数据库连接过后，千万不要忘记关闭数据库连接
    client.close()

2.3 数据库已经连接上了，我想获取样本信息怎么办？
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

样本信息在一个叫ov_sample的表（或者说叫collection）里面

.. code-block:: python

    ov_sample_collection = db.get_collection('ov_sample')
    # get_collection函数传入collection名称得到collection对象
    # 或者说你嫌麻烦这一步可以省略，没有必要获取collection对象
    # 我这样做是为了说明问题
    # db有个属性叫ov_sample，这个属性本身就是一个collection对象
    # db.get_collection('ov_sample') = db.ov_sample

    obj = db.ov_sample.find_one({'name': '权玲'})
    # 获取一个叫权玲的样本
    # find_one方法返回一个dict实例
    # obj有6个键:
    #  _id: bson ObjectId对象，作为主键存在
    #  name: 样本名字
    # gender: 样本性别
    # age: 样本年龄
    # address，样本住址
    # genotype_info: 样本基因型，也就是这个样本做测序时所选的所有疾病的位点集合
    # 啊！有这么多我不想要的信息，肯定影响我的程序的性能！我现在就只想要样本姓名、年龄怎么办?
    db.ov_sample.find_one({'name': '权玲'}, {'name': 1, 'age': 1})  # 返回一个只有name、age键的字典

    # 如果你不确定叫权玲的样本只有一个请使用find方法
    # find方法返回一个数据库游标实例
    # 通过遍历游标来获取所有对象
    # 例如：我想获取所有年龄大于50岁的样本信息
    cur_obj = db.ov_sample.find({'age': {'$gte': 50}})  # cur_obj是一个游标对象，可以这样遍历

    for obj in cur_obj:
        print(obj['age'])

2.4 数据库里面总共有多少种疾病？每种疾病的每个位点的OR值怎么获取？
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


.. code-block:: python

    item_list = db.ov_item.distinct('name')
    # item_list就是疾病的列表

    obj = db.ov_item.find_one({'name': '肺癌'})
    # 这个地方你可以放心地使用find_one，因为肺癌只有一个
    # obj有三个键
    #   _id: BSON ObjectId对象，作为主键存在
    #  name: 疾病名称
    # sites: 疾病的位点信息，是一个列表，每个元素是一个字典，有三个键:
    #    heterozygous_or: 杂合OR值，注意这个值有可能为空或者'---'都表示现在信息不全
    #    homozygous_or: 纯合OR值
    #    info: 外键到affy axiom pmra anno表，可以用来得到位点的所有注释信息

    site = obj['sites'][0]  # 第一个位点
    site['homozygous_or']  # 第1个位点的纯合OR值
    apa = db.dereference(site['info'])  # 第一个位点的详细注释信息

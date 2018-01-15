from sklearn.externals import joblib
from sklearn import svm
from tensorflow.examples.tutorials.mnist import input_data

data = input_data.read_data_sets("/tmp/data/", one_hot=True)


def transform_for_svm(train_target):
    category = list()
    count = 0

    for line in train_target:
        count += 1
        i = 0
        for numb in line:
            if numb > 0:
                category.append(i)
                break
            i += 1
    return category


def svm_to_array(classify):
    category = [0] * 10
    category[classify] = 1
    return category


clf = svm.LinearSVC()

for _ in range(1000):
    train_data, train_target = data.train.next_batch(100)
    train_target = transform_for_svm(train_target)
    clf.fit(train_data, train_target)
print("Data Value:", data.test.labels)
print("Predict Value", clf.predict(data.test.images))
# print(svm_to_array(7))

joblib.dump(clf, 'data/svm.pkl')

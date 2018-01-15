from sklearn.externals import joblib
from sklearn.neighbors import KNeighborsClassifier
from tensorflow.examples.tutorials.mnist import input_data

data = input_data.read_data_sets("/tmp/data/", one_hot=True)

clf = KNeighborsClassifier(n_neighbors=1)

for _ in range(1000):
    train_data, train_target = data.train.next_batch(100)
    clf.fit(train_data, train_target)
print("Data Value:", data.test.labels)
print("Predict Value", clf.predict(data.test.images))

joblib.dump(clf, 'data/knn.pkl')
